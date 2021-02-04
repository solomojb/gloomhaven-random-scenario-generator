import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'
import { initialMapData, MapData } from '../../../State/MapData';

type ContextData = {
    dungeon: MapData;
    setDungeon : ( dungeon: MapData) => void;
}

const initialContextData: ContextData = {
    dungeon: initialMapData,
    setDungeon : () => {}
}


export const DungeonContext = createContext<ContextData>(initialContextData);

export function useDungeon() {
    return useContext(DungeonContext);
}

type Props = {
    intitialDungeon:MapData;
    children: ReactNode;
}

const DungeonProvider = (props:Props) => {
    const {intitialDungeon, children} = props;
    const [dungeon, setDungeon] = useState<MapData>(intitialDungeon);
    const { Provider } = DungeonContext;

    useEffect(() => {
        setDungeon(intitialDungeon);
    }, [intitialDungeon])

    const setDungeonData = (data: MapData) => {
        console.log("Sdd", JSON.stringify(data.tiles));
        setDungeon(data);
    }

    return <Provider value={{dungeon, setDungeon: setDungeonData}}>{children}</Provider>
}
 
export default DungeonProvider;
