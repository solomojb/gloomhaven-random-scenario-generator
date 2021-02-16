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
    storeShowFlags(state, action: PayloadAction<number>) {
      const gameState = state.itemViewMap[state.currentGameType];
      if (gameState) {
        gameState.showFlags = action.payload;
      }
    },
  }
});

export const {
  storeShowFlags,
} = stateSlice.actions;

export default stateSlice.reducer;