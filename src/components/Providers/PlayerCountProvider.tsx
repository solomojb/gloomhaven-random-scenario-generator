import React, { useContext, createContext, ReactNode, useEffect, useState, FC } from 'react'

type ContextData = {
    playerCount: number;
    setPlayerCount: ( players: number) => void;
}

export const PlayerCountContext = createContext<ContextData|undefined>(undefined);

export function usePlayerCount() {
    const result =  useContext(PlayerCountContext);
    if (!result) {
        throw Error("No Context Found");
    }
    return result;
}

type Props = {
    localKey: string
}

const PlayerCountProvider:FC<Props> = (props) => {
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
