import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'
import { Dungeon, initialDungeon } from '../../../Data';

type ContextData = {
    dungeon: Dungeon;
    setDungeon : ( dungeon: Dungeon) => void;
}

const initialContextData: ContextData = {
    dungeon: initialDungeon,
    setDungeon : () => {}
}


export const DungeonContext = createContext<ContextData>(initialContextData);

export function useDungeon() {
    return useContext(DungeonContext);
}

type Props = {
    intitialDungeon:Dungeon;
    children: ReactNode;
}

const DungeonProvider = (props:Props) => {
    const {intitialDungeon, children} = props;
    const [dungeon, setDungeon] = useState<Dungeon>(intitialDungeon);
    const { Provider } = DungeonContext;

    useEffect(() => {
        setDungeon(intitialDungeon);
    }, [intitialDungeon])

    const setDungeonData = (data: Dungeon) => {
        setDungeon(data);
    }

    return <Provider value={{dungeon, setDungeon: setDungeonData}}>{children}</Provider>
}
 
export default DungeonProvider;
