import React, { useContext, createContext, useState, FC } from 'react'
import {BaseGameData, gameDataTypes} from '../../games'
import GHGameData from '../../games/gh/GHGameData';
import { GameType } from './GameType';

export const GameContext = createContext<BaseGameData>(gameDataTypes[GameType.Gloomhaven]);

export function useGame() {
    return useContext(GameContext);
}

const GameProvider:FC = (props) => {
    const {children} = props;
    const [gameData] = useState<BaseGameData>(new GHGameData());

    return <GameContext.Provider value={gameData}>{children}</GameContext.Provider>
}
 
export default GameProvider;
