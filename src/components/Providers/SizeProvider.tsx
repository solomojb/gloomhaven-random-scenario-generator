import React, { useContext, createContext, ReactNode, useEffect, useState, FC, useMemo } from 'react'
import Point from '../../react-hexgrid-2/models/Point';
import { useDungeon } from '../Tabs/Maps/DungeonProvider';

type ContextData = {
    size: Point
    setSize: ( size: Point) => void;
}

export const Context = createContext<ContextData|undefined>(undefined);

export function useSizeProvider() {
    const result = useContext(Context);
    if (!result) {
        throw Error("No Context found");
    }
    return result;
}

export const SizeProvider: FC = (props) => {
    const { dungeon:{ map: { rotateHex }} } = useDungeon();
    const {children} = props;
    const [size, setSize] = useState<Point>(rotateHex ? {x:6.3, y:5.5}: {x:6.3, y:5.41});
    const { Provider } = Context;
    const value = useMemo(() => {
        return { size, setSize}
    }, [size, setSize])

    return <Provider value={value}>{children}</Provider>
}
 
