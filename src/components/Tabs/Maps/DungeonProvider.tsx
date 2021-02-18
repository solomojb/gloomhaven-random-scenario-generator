import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'
import { Dungeon, initialDungeon, initialMonsterData, MonsterData } from '../../../Data';

type ContextData = {
    dungeon: Dungeon;
    setDungeon : ( dungeon: Dungeon) => void;
    monsterData: MonsterData;
    roomNumber: number;
}

const initialContextData: ContextData = {
    dungeon: initialDungeon,
    setDungeon : () => {},
    monsterData: initialMonsterData,
    roomNumber: -1
}


export const DungeonContext = createContext<ContextData>(initialContextData);

export function useDungeon() {
    return useContext(DungeonContext);
}

type Props = {
    intitialDungeon:Dungeon;
    monsterData: MonsterData;
    children: ReactNode;
    roomNumber?: number;
}

const DungeonProvider = (props:Props) => {
    const {intitialDungeon, children, monsterData, roomNumber = -1} = props;
    const [dungeon, setDungeon] = useState<Dungeon>(intitialDungeon);
    const { Provider } = DungeonContext;

    return <Provider value={{dungeon:intitialDungeon, setDungeon, monsterData, roomNumber}}>{children}</Provider>
}
 
export default DungeonProvider;
