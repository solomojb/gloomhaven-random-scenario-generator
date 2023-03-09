import React, { createContext, FC, useContext, useEffect, useMemo, useState } from "react"
import { useGame } from "../Game/GameProvider";

type ContextData = {
    scenarioData: ScenarioData
    getNextRoom : (aOrB:string, roomNumber:number) => void;
    gotoPreviousRoom : (roomNumber:number) => void;
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => boolean
    resetScenario: () => void;
    setPenaltyChosen: (roomNumber:number, penalty:string) => void;
    activeRoomNumber: number;
    setActiveRoomNumber: (activeRoomNumber: number) => void;
    toggleInfiniteRooms: () => void;
    toggleGameIncluded: (gameType: string) => void;
    roomsAvailable: number;
}

export const ScenarioContext = createContext<ContextData | undefined>(undefined);

export function useScenario() {
    const returnValue =  useContext(ScenarioContext);
    if (!returnValue) {
        throw Error ("No Context Found");
    }
    return returnValue;
}

interface Props {
    isMapMode?: boolean;
}

const ScenarioProvider:FC<Props> = (props) => {
    const { children, isMapMode } = props;
    const game = useGame();
    const [scenarioData, setScenarioData] = useState<ScenarioData>({rooms:[], penaltyChosen:{}, gamesIncluded:[], infiniteRooms: false});
    const [activeRoomNumber, setActiveRoomNumber] = useState<number>(0);

    const toggleGameIncluded = (gameType: string) => (
        setScenarioData((current) => {
            const {gamesIncluded} = current;
            const index = gamesIncluded.findIndex(el => el === gameType);
            if (index !== -1) {
                gamesIncluded.splice(index, 1);
                return {...current, gamesIncluded: [...gamesIncluded]};
            }
            else {
                return {...current, gamesIncluded: [...current.gamesIncluded, gameType]};
            }
        }))
    const toggleInfiniteRooms = () => {
        setScenarioData((current) => {
            return {...current, infiniteRooms: !current.infiniteRooms}
        })
    }
    
    
    const monsters = useMemo(() => {
        const filter = (data:MonsterData) => {
            if (!scenarioData.gamesIncluded.includes(data.game)) {
                return false;
            }
            if (scenarioData.rooms.some((room:RoomData) => room.monsterName === data.name)) {
                return false;
            }
            return true;
        }

        const monsterList = game.getRandomMonsters().filter(filter);
        return monsterList;
    }, [scenarioData])

    const dungeons = useMemo(() => {
        const filter = (data:Dungeon) => {
            if (!data.game) {
                return false;
            }
            if (data.game) {
                if (!scenarioData.gamesIncluded.includes(data.game)) {
                    return false;
                }
            }
            if (scenarioData.rooms.some((room:RoomData) => room.dungeonName === data.name)) {
                return false;
            }
            return true;
        }

        const dungeonList = game.getRandomDungeons().filter(filter);
        return dungeonList;
    }, [scenarioData])

    console.log(dungeons, monsters);


    useEffect(() => {
        const savedData =localStorage.getItem("scenario");
        let scenarioData:ScenarioData = { rooms:[], penaltyChosen:{}, gamesIncluded:[], infiniteRooms: false};
        if (savedData) {
            scenarioData = JSON.parse(savedData);
            // @ts-ignore
            const oldPenalties = scenarioData.penalties;
            if (oldPenalties) {
                scenarioData.penaltyChosen = {};
                oldPenalties.forEach((penalty:string , index: number) => {
                    scenarioData.penaltyChosen[index] = penalty;
                });
            }
            if (!scenarioData.gamesIncluded) {
                scenarioData.gamesIncluded = [];
            }
            setScenarioData(scenarioData);
        } 
    }, []);

    const resetScenario = () => {   
        setScenarioData(current => ({
            ...current,
            rooms: [],
            penaltyChosen: {}
        }));
        setActiveRoomNumber(0);
    }

    useEffect(() => {
        localStorage.setItem("scenario", JSON.stringify(scenarioData));
    }, [scenarioData])

    const getNextDunegonIndex = (aOrB: string) => {
        return aOrB.length ? dungeons.findIndex(dungeon => dungeon.entrances.find( entrance => entrance.aOrB === aOrB)) : 0;
    }

    const getNextRoom = (aOrB:string, roomNumber:number) => {
        if (isMapMode) {
            return;
        }
        if (!scenarioData.infiniteRooms && roomNumber >= 2) {
            return;
        }

        if ((roomNumber >= 0) && scenarioData.rooms[roomNumber + 1]) {
            setActiveRoomNumber(roomNumber + 1);
            return;
        }

        const dungeonIndex = getNextDunegonIndex(aOrB);
        if (dungeonIndex < 0) {
            return;
        }
        const dungeon = dungeons.splice(dungeonIndex, 1)[0];
        const monster = monsters.shift();
        if (!dungeon || !monster) {
            return;
        }

        const roomData:RoomData = { monsterName: monster.name, dungeonName: dungeon.name, chosenEntrance:aOrB, chosenExit:""};
        setScenarioData( current => {
            const rooms = [...current.rooms, roomData];
            if (roomNumber > 0) {
                const currentRoom = rooms[roomNumber];
                currentRoom.chosenExit = aOrB;
            }
            return {...current, rooms}}
        );
        setActiveRoomNumber(roomNumber + 1);
    }

    const gotoPreviousRoom = (roomNumber:number) => {
        if (isMapMode || roomNumber > scenarioData.rooms.length - 2 || roomNumber <1) {
            return;
        }

        setActiveRoomNumber(roomNumber - 1);
    }


    const isDoorShown = (aOrB:string,roomNumber: number, type: string) => {
        if (isMapMode) {
            return true;
        }
        if (roomNumber >= scenarioData.rooms.length) {
            return true;
        }
        const { chosenEntrance, chosenExit } = scenarioData.rooms[roomNumber];
        
        if (type === "Entrance" && chosenEntrance.length > 0 && chosenEntrance != aOrB) {
            return false;
          }

        if (type === "Exit") {
            if (chosenExit.length > 0 && chosenExit != aOrB) {
                return false;
            }
            if (!scenarioData.infiniteRooms && roomNumber >= 2) {
                return false;
            }
            const dungeonIndex = getNextDunegonIndex(aOrB);
            if (roomNumber === scenarioData.rooms.length - 1 && dungeonIndex < 0) {
                return false;
            }
          }

        return true
    }

    const setPenaltyChosen = (roomNumber:number, penalty:string) => {
        setScenarioData( current => {
            return {...current, penaltyChosen: {...current.penaltyChosen, [roomNumber]: penalty}};
        });        
    }

    const { Provider } = ScenarioContext;

    return <Provider value={{roomsAvailable: dungeons.length, scenarioData, getNextRoom, gotoPreviousRoom, isDoorShown, resetScenario, setPenaltyChosen, activeRoomNumber, setActiveRoomNumber, toggleInfiniteRooms, toggleGameIncluded}}>{children}</Provider>
}

export default ScenarioProvider;