import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameType } from "./GameType";
import {
  ItemViewStateMap,
  initialItemViewStateMapState,
} from "./ItemViewState";
import { MapData } from "./MapData";

type RealState = {
  currentGameType: GameType;
  itemViewMap: ItemViewStateMap;
};

const initialRealState: RealState = {
  currentGameType: GameType.Gloomhaven,
  itemViewMap: initialItemViewStateMapState,
};

const stateSlice = createSlice({
  name: "realState",
  initialState: initialRealState,
  reducers: {
    storeCurrentGameType(state, action: PayloadAction<GameType>) {
      state.currentGameType = action.payload;
    },
    storeShowFlags(state, action: PayloadAction<number>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.showFlags = action.payload;
      }
    },
    storeNumberOfPlayers(state, action: PayloadAction<number>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.numberOfPlayers = action.payload;
      }
    },
    storeMapOffsetX(state, action: PayloadAction<number>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.mapOffsetX = action.payload;
      }
    },
    storeMapOffsetY(state, action: PayloadAction<number>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.mapOffsetY = action.payload;
      }
    },
    storeRotateHex(state, action: PayloadAction<boolean>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.rotateHex = action.payload;
      }
    },
  }
});

export const {
  storeShowFlags,
  storeNumberOfPlayers,
  storeMapOffsetX,
  storeMapOffsetY,
  storeRotateHex
} = stateSlice.actions;

export default stateSlice.reducer;