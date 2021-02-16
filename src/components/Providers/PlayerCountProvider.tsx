import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'

type ContextData = {
    playerCount: number;
    setPlayerCount: ( players: number) => void;
}

const initialContextData: ContextData = {
    playerCount: 2,
    setPlayerCount: () => {},
}


export const PlayerCountContext = createContext<ContextData>(initialContextData);

export function usePlayerCount() {
    return useContext(PlayerCountContext);
}

type Props = {
    localKey: string
    children: ReactNode;
}

const PlayerCountProvider = (props:Props) => {
    const {children, localKey} = props;
    const [playerCount, setPlayerCount] = useState<number>(parseInt(localStorage.getItem(localKey) ||"2"));
    const { Provider } = PlayerCountContext;

    const storePlayerInStateandLocal = (count: number) =>  {
        setPlayerCount(count);
        localStorage.setItem(localKey, count.toString());

    }

    return <Provider value={{playerCount, setPlayerCount:storePlayerInStateandLocal}}>{children}</Provider>
}
 
export default PlayerCountProvider;
