import React, { createContext, ReactNode, useContext, useState } from "react"
import { Dungeon, MonsterData } from "../../Data";
import { useGame } from "../Game/GameProvider";

type RoomData = {
    dungeon: Dungeon;
    monsters: MonsterData;
}



type ContextData = {
    rooms: RoomData[];
    getNextRoom : (aOrB?:string) => void
}

const initialContext:ContextData = {
    rooms: [], 
    getNextRoom : () => {}
}

export const ScenarioContext = createContext<ContextData>(initialContext);

export function useScenario() {
    return useContext(ScenarioContext);
}

type Props = {
    children: ReactNode | ReactNode[];
}

const ScenarioProvider = (props: Props) => {
    const { children } = props;
    const game = useGame();
    const [dungeons] = useState<string[]>(game.getDungeonList());
    const [monsters] = useState<string[]>(game.getMonsterList());
    const [rooms, setRooms] = useState<RoomData[]>([]);

    const getNextRoom = (aOrB?:string) => {
        console.log("getting next room", aOrB);
        const dungeon = dungeons.shift();
        const monster = monsters.shift();
        if (!dungeon || !monster) {
            return;
        }
        const roomData:RoomData = { monsters: game.getMonsterData(monster), dungeon: game.getDungeonData(dungeon)};
        setRooms( (current:RoomData[]) => {
            const newRooms = Object.assign([], current);
            newRooms.push(roomData);
            return newRooms;
        })
    }

    const { Provider } = ScenarioContext;

    return <Provider value={{rooms, getNextRoom}}>{children}</Provider>
}

export default ScenarioProvider;