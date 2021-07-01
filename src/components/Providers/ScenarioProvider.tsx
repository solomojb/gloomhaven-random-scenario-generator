import React, { createContext, FC, useContext, useEffect, useState } from "react"
import { useGame } from "../Game/GameProvider";
import { ShowFlags, useFlags } from "./FlagsProvider";

type RoomData = {
    dungeon: Dungeon;
    monsters: MonsterData;
    chosenEntrance: string;
    chosenExit:string;
}

type ContextData = {
    rooms: RoomData[];
    penalties: string[];
    getNextRoom : (aOrB:string, roomNumber:number) => void;
    gotoPreviousRoom : (roomNumber:number) => void;
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => boolean
    resetScenario: () => void;
    setPenalty: (roomNumber:number, penalty:string) => void;
    activeRoomNumber: number;
    setActiveRoomNumber: (activeRoomNumber: number) => void;
}

const initialContext:ContextData = {
    rooms: [], 
    penalties: [],
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
        return monsterList;
    }


    const [dungeons, setDungeons] = useState<Dungeon[]>(game.getRandomDungeons());
    const [monsters, setMonsters] = useState<MonsterData[]>(getMonsters());
    const [rooms, setRooms] = useState<RoomData[]>([]);
    const [penalties, setPenalites] = useState<string[]>(["none", "none", "none"]);
    const [activeRoomNumber, setActiveRoomNumber] = useState<number>(0);

    const resetScenario = () => {
        setRooms([]);
        setDungeons(game.getRandomDungeons());
        setMonsters(getMonsters());
        setPenalites(["none", "none", "none"]);
        setActiveRoomNumber(0);
    }

    const getNextRoom = (aOrB:string, roomNumber:number) => {
        if (roomNumber >= 2) {
            return;
        }

        if ((roomNumber >= 0) && rooms[roomNumber + 1]) {
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

        const roomData:RoomData = { monsters: monster, dungeon: dungeon, chosenEntrance:aOrB, chosenExit:""};
        setRooms( (current:RoomData[]) => {
            const newRooms = Object.assign([], current);
            newRooms.push(roomData);
            if (roomNumber > 0) {
                const currentRoom = newRooms[roomNumber] as RoomData;
                currentRoom.chosenExit = aOrB;
            }
            return newRooms;
        })
        setActiveRoomNumber(roomNumber + 1);
    }

    const gotoPreviousRoom = (roomNumber:number) => {
        if (roomNumber >2 || roomNumber <1) {
            return;
        }

        setActiveRoomNumber(roomNumber - 1);
    }


    const isDoorShown = (aOrB:string,roomNumber: number, type: string) => {
        if (roomNumber >= rooms.length) {
            return true;
        }
        const { chosenEntrance, chosenExit } = rooms[roomNumber];
        
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
        setPenalites( current => {
            const newPenalties: string[] = Object.assign([], current);
            newPenalties[roomNumber] = penalty;
            return  newPenalties;
        })
    }

    const { Provider } = ScenarioContext;

    return <Provider value={{rooms, getNextRoom, gotoPreviousRoom, isDoorShown, resetScenario, penalties, setPenalty, activeRoomNumber, setActiveRoomNumber}}>{children}</Provider>
}

export default ScenarioProvider;