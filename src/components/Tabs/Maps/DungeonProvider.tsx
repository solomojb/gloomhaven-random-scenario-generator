import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'
import { Dungeon, initialDungeon, initialMonsterData, MonsterData } from '../../../Data';

type ContextData = {
    dungeon: Dungeon;
    setDungeon : ( dungeon: Dungeon) => void;
    monsterData: MonsterData;
}

const initialContextData: ContextData = {
    dungeon: initialDungeon,
    setDungeon : () => {},
    monsterData: initialMonsterData
}


export const DungeonContext = createContext<ContextData>(initialContextData);

export function useDungeon() {
    return useContext(DungeonContext);
}

type Props = {
    intitialDungeon:Dungeon;
    monsterData: MonsterData;
    children: ReactNode;
}

const DungeonProvider = (props:Props) => {
    const {intitialDungeon, children, monsterData} = props;
    const [dungeon, setDungeon] = useState<Dungeon>(intitialDungeon);
    const { Provider } = DungeonContext;

    useEffect(() => {
        setDungeon(intitialDungeon);
    }, [intitialDungeon])

    return <Provider value={{dungeon, setDungeon, monsterData}}>{children}</Provider>
}
 
export default DungeonProvider;
