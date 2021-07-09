import React, { useContext, createContext, useEffect, useState, FC } from 'react'
import {BaseGameData, gameDataTypes} from '../../games'
import { GameType } from './GameType';

export const GameContext = createContext<BaseGameData>(gameDataTypes[GameType.Gloomhaven]);

export function useGame() {
    return useContext(GameContext);
}

type Props = {
    gameType:GameType;
}

const GameProvider:FC<Props> = (props) => {
    const {gameType, children} = props;
    const [gameData, setGameData] = useState<BaseGameData>(gameDataTypes[GameType.Gloomhaven]);
    
    useEffect( () => {
        const data = gameDataTypes[gameType];
        if (data) {
            data.getDungeonList();
            setGameData(data);
        }
    }, [gameType]);


    return <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
}
 
export default GameProvider;
