import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'
import {BaseGameData, gameDataTypes} from '../../games'
import { GameType } from '../../State/GameType';

export const GameContext = createContext<BaseGameData>(gameDataTypes[GameType.Gloomhaven]);

export function useGame() {
    return useContext(GameContext);
}

type Props = {
    gameType:GameType;
    children: ReactNode;
}

const GameProvider = (props:Props) => {
    const {gameType, children} = props;
    const [gameData, setGameData] = useState<BaseGameData>(gameDataTypes[GameType.Gloomhaven]);
    
    useEffect( () => {
        const data = gameDataTypes[gameType] as BaseGameData;
        if (data) {
            data.getDungeonList();
            setGameData(data);
        }
    }, [gameType]);


    useEffect( () => {
        const data = gameDataTypes[gameType] as BaseGameData;
        if (data) {
            data.getDungeonList();
            setGameData(data);
        }
    }, [gameType]);


    return <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
}
 
export default GameProvider;
