import React, { createContext, FC, useContext, useEffect, useState } from "react"
import { useGame } from "../Game/GameProvider";
import { ShowFlags, useFlags } from "./FlagsProvider";


type RoomData = {
    dungeonName: string;
    monsterName: string;
    chosenEntrance: string;
    chosenExit:string;
}
type ScenarioData = {
    rooms: RoomData[];
    penaltyChosen: Record<number, string>;
}

type ContextData = {
    scenarioData: ScenarioData
    getNextRoom : (aOrB:string, roomNumber:number) => void;
    gotoPreviousRoom : (roomNumber:number) => void;
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => boolean
    resetScenario: () => void;
    setPenaltyChosen: (roomNumber:number, penalty:string) => void;
    activeRoomNumber: number;
    setActiveRoomNumber: (activeRoomNumber: number) => void;
    setInfiniteRooms: (b: boolean) => void;
}

const initialContext:ContextData = {
    scenarioData: {
        rooms:[],
        penaltyChosen: {},
    },
    getNextRoom : () => {},
    gotoPreviousRoom : (roomNumber:number) => {},
    resetScenario : () => {},
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => true,
    setPenaltyChosen: () => {},
    activeRoomNumber: 0,
    setActiveRoomNumber: () => {},
    setInfiniteRooms: () => {}
}

export const ScenarioContext = createContext<ContextData>(initialContext);

export function useScenario() {
    return useContext(ScenarioContext);
}

const ScenarioProvider:FC = (props) => {
    const { children } = props;
    const game = useGame();
    const { isFlagSet } = useFlags();
    const [infiniteRooms, setInfiniteRooms] = useState<boolean>(isFlagSet(ShowFlags.InfiniteRooms));
    
    const getMonsters = () => {
        const filter = (data:MonsterData) => {
            if (!isFlagSet(ShowFlags.AddForgottenCircles)) {
                return data.game !== "FC";
            }
            return true;
        }

        const monsterList = game.getRandomMonsters().filter(filter);
        return monsterList;
    }


    const [dungeons, setDungeons] = useState<Dungeon[]>([]);
    const [monsters, setMonsters] = useState<MonsterData[]>([]);
    const [scenarioData, setScenarioData] = useState<ScenarioData>({rooms:[], penaltyChosen:{}});
    const [activeRoomNumber, setActiveRoomNumber] = useState<number>(0);

    useEffect(() => {
        const savedData =localStorage.getItem("scenario");
        let scenarioData:ScenarioData = { rooms:[], penaltyChosen:{}};
        let d = game.getRandomDungeons();
        let m = getMonsters();
        if (savedData) {
            scenarioData = JSON.parse(savedData);
            scenarioData.rooms.forEach(room => {
                const dIndex = d.findIndex( dungeon => dungeon.name === room.dungeonName);
                if (dIndex !== -1) {
                    d.splice(dIndex,1);
                }
                const mIndex = m.findIndex( monster => monster.name === room.monsterName);
                if (mIndex !== -1) {
                    m.splice(mIndex,1);
                }
            })
            // @ts-ignore
            const oldPenalties = scenarioData.penalties;
            if (oldPenalties) {
                scenarioData.penaltyChosen = {};
                oldPenalties.forEach((penalty:string , index: number) => {
                    scenarioData.penaltyChosen[index] = penalty;
                });
            }
        } 
        setDungeons(d);
        setMonsters(m);
        setScenarioData(scenarioData);
    }, []);

    const resetScenario = () => {
        setScenarioData({ rooms:[], penaltyChosen:{}});
        setDungeons(game.getRandomDungeons());
        setMonsters(getMonsters());
        setActiveRoomNumber(0);
        setInfiniteRooms(false);
    }

    useEffect(() => {
        if (scenarioData.rooms.length > 0) {
            localStorage.setItem("scenario", JSON.stringify(scenarioData));
        }
    }, [scenarioData])

    const getNextDunegonIndex = (aOrB: string) => {
        return aOrB.length ? dungeons.findIndex(dungeon => dungeon.entrances.find( entrance => entrance.aOrB === aOrB)) : 0;
    }

    const getNextRoom = (aOrB:string, roomNumber:number) => {
        if (!infiniteRooms && roomNumber >= 2) {
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
        if (roomNumber >2 || roomNumber <1) {
            return;
        }

        setActiveRoomNumber(roomNumber - 1);
    }


    const isDoorShown = (aOrB:string,roomNumber: number, type: string) => {
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
            if (!infiniteRooms && roomNumber >= 2) {
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

    return <Provider value={{scenarioData, getNextRoom, gotoPreviousRoom, isDoorShown, resetScenario, setPenaltyChosen, activeRoomNumber, setActiveRoomNumber, setInfiniteRooms}}>{children}</Provider>
}

export default ScenarioProvider;