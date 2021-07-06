import React, { useContext, createContext, useEffect, useState, FC } from 'react'

type ContextData = {
    dungeon: Dungeon;
    setDungeon : ( dungeon: Dungeon) => void;
    monsterData: MonsterData;
    setMonsters : ( monsters: MonsterData) => void;
    roomNumber: number;
}

export const DungeonContext = createContext<ContextData|undefined>(undefined);

export function useDungeon() {
    const result = useContext(DungeonContext);
    if (!result) {
        throw Error ("No Context Found");
    }
    return result;
}

type Props = {
    intitialDungeon:Dungeon;
    monsterData: MonsterData;
    roomNumber?: number;
}

const DungeonProvider:FC<Props> = (props) => {
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
