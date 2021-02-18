import React, { createContext, ReactNode, useContext, useState } from "react"
import { Dungeon, MonsterData } from "../../Data";
import { useGame } from "../Game/GameProvider";

type RoomData = {
    dungeon: Dungeon;
    monsters: MonsterData;
    chosenEntrance: string;
    chosenExit:string;
}



type ContextData = {
    rooms: RoomData[];
    getNextRoom : (aOrB:string, roomNumber:number) => void;
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => boolean
    resetScenario: () => void;
}

const initialContext:ContextData = {
    rooms: [], 
    getNextRoom : () => {},
    resetScenario : () => {},
    isDoorShown: (aOrB:string,roomNumber: number, type: string) => true

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
    const [dungeons, setDungeons] = useState<Dungeon[]>(game.getRandomDungeons());
    const [monsters, setMonsters] = useState<MonsterData[]>(game.getRandomMonsters());
    const [rooms, setRooms] = useState<RoomData[]>([]);

    const resetScenario = () => {
        setRooms([]);
        setDungeons(game.getRandomDungeons());
        setMonsters(game.getRandomMonsters());
    }

    const getNextRoom = (aOrB:string, roomNumber:number) => {
        const dungeonIndex = aOrB.length ? dungeons.findIndex(dungeon => dungeon.entrances.find( entrance => entrance.aOrB === aOrB)) : 0;
        if (dungeonIndex < 0) {
            return;
        }
        const dungeon = dungeons.splice(dungeonIndex, 1)[0];
        const monster = monsters.shift();
        if (!dungeon || !monster) {
            return;
        }

        if (roomNumber >= 2) {
            return;
        }

        if ((roomNumber >= 0) && rooms[roomNumber + 1]) {
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

    const { Provider } = ScenarioContext;

    return <Provider value={{rooms, getNextRoom, isDoorShown, resetScenario}}>{children}</Provider>
}

export default ScenarioProvider;