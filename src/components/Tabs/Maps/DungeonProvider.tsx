import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'
import { Dungeon, initialDungeon, initialMonsterData, MonsterData } from '../../../Data';

type ContextData = {
    dungeon: Dungeon;
    setDungeon : ( dungeon: Dungeon) => void;
    monsterData: MonsterData;
    setMonsters : ( monsters: MonsterData) => void;
    roomNumber: number;
}

const initialContextData: ContextData = {
    dungeon: initialDungeon,
    setDungeon : () => {},
    monsterData: initialMonsterData,
    setMonsters : () => {},
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
    const [monsters, setMonsters] = useState<MonsterData>(monsterData);
    const { Provider } = DungeonContext;

    useEffect( () => 
    {
        setDungeon(intitialDungeon);
    }, [intitialDungeon]);

    useEffect( () => 
    {
        setMonsters(monsterData);
    }, [monsterData]);


    return <Provider value={{dungeon, setDungeon, monsterData:monsters, setMonsters, roomNumber}}>{children}</Provider>
}
 
export default DungeonProvider;
