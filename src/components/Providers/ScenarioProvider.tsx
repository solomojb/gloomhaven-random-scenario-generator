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
    penalties: string[];
}

type ContextData = {
    scenarioData: ScenarioData
    getNextRoom : (aOrB:string, roomNumber:number) => void;
    gotoPreviousRoom : (roomNumber:number) => void;
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => boolean
    resetScenario: () => void;
    setPenalty: (roomNumber:number, penalty:string) => void;
    activeRoomNumber: number;
    setActiveRoomNumber: (activeRoomNumber: number) => void;
}

const initialContext:ContextData = {
    scenarioData: {
        rooms:[],
        penalties: [],
    },
    getNextRoom : () => {},
    gotoPreviousRoom : (roomNumber:number) => {},
    resetScenario : () => {},
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => true,
    setPenalty: () => {},
    activeRoomNumber: 0,
    setActiveRoomNumber: () => {}
}

export const ScenarioContext = createContext<ContextData>(initialContext);

export function useScenario() {
    return useContext(ScenarioContext);
}

const ScenarioProvider:FC = (props) => {
    const { children } = props;
    const game = useGame();
    const { isFlagSet } = useFlags();
    
    const getMonsters = () => {
        const filter = (data:MonsterData) => {
            if (!isFlagSet(ShowFlags.AddForgottenCircles)) {
                return data.game !== "FC";
            }
            return true;
        }

        const monsterList = game.getRandomMonsters().filter(filter);
        console.log("getting", monsterList);
        return monsterList;
    }


    const [dungeons, setDungeons] = useState<Dungeon[]>([]);
    const [monsters, setMonsters] = useState<MonsterData[]>([]);
    const [scenarioData, setScenarioData] = useState<ScenarioData>({rooms:[], penalties:[]});
    const [activeRoomNumber, setActiveRoomNumber] = useState<number>(0);

    useEffect(() => {
        const savedData =localStorage.getItem("scenario");
        let scenarioData:ScenarioData = { rooms:[], penalties:["none", "none", "none"]};
        let d = game.getRandomDungeons();
        let m = getMonsters();
        if (savedData) {
            scenarioData = JSON.parse(savedData);
            scenarioData.rooms.forEach(room => {
                const dIndex = d.findIndex( dungeon => dungeon.name === room.dungeonName);
                if (dIndex > 0) {
                    d.splice(dIndex,1);
                }
                const mIndex = m.findIndex( monster => monster.name === room.monsterName);
                if (mIndex) {
                    console.log("removing " + m[mIndex].name)
                    m.splice(mIndex,1);
                }
            })
        } 
        console.log(m);
        setDungeons(d);
        setMonsters(m);
        setScenarioData(scenarioData);
    }, []);

    const resetScenario = () => {
        setScenarioData({ rooms:[], penalties:["none", "none", "none"]});
        localStorage.removeItem("scenario");
        setDungeons(game.getRandomDungeons());
        setMonsters(getMonsters());
        setActiveRoomNumber(0);
    }

    useEffect(() => {
        if (scenarioData.rooms.length > 0) {
            localStorage.setItem("scenario", JSON.stringify(scenarioData));
        }
    }, [scenarioData])

    const getNextRoom = (aOrB:string, roomNumber:number) => {
        if (roomNumber >= 2) {
            return;
        }

        if ((roomNumber >= 0) && scenarioData.rooms[roomNumber + 1]) {
            setActiveRoomNumber(roomNumber + 1);
            return;
        }

        const dungeonIndex = aOrB.length ? dungeons.findIndex(dungeon => dungeon.entrances.find( entrance => entrance.aOrB === aOrB)) : 0;
        if (dungeonIndex < 0) {
            return;
        }
        const dungeon = dungeons.splice(dungeonIndex, 1)[0];
        const monster = monsters.shift();
        if (!dungeon || !monster) {
            return;
        }
        console.log("choosing", monster.name, monsters);

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
            if (roomNumber >= 2) {
                return false;
            }
          }

        return true
    }

    const setPenalty = (roomNumber:number, penalty:string) => {
        setScenarioData( current => {
            const penalties = [...current.penalties];
            penalties[roomNumber] = penalty;
            return {...current, penalties};
        });        
    }

    const { Provider } = ScenarioContext;

    return <Provider value={{scenarioData, getNextRoom, gotoPreviousRoom, isDoorShown, resetScenario, setPenalty, activeRoomNumber, setActiveRoomNumber}}>{children}</Provider>
}

export default ScenarioProvider;