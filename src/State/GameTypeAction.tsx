import { PayloadAction } from "@reduxjs/toolkit";
import { GameType } from "./GameType";

type GameTypeAction<T> = {
    value: T;
    gameType: GameType;
}

export interface PayloadGameTypeAction<T> extends PayloadAction<GameTypeAction<T>> {
    
}
