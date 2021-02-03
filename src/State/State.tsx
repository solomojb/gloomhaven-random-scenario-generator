import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameType } from "./GameType";
import {
  ItemViewStateMap,
  initialItemViewStateMapState,
} from "./ItemViewState";

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
    storeShowGrid(state, action: PayloadAction<boolean>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.showGrid = action.payload;
      }
    },
    storeNumberOfPlayers(state, action: PayloadAction<number>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.numberOfPlayers = action.payload;
      }
    },
  }
});

export const {
  storeShowGrid,
  storeNumberOfPlayers
} = stateSlice.actions;

export default stateSlice.reducer;