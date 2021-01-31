import { createSlice } from "@reduxjs/toolkit";
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

const realSlice = createSlice({
  name: "realState",
  initialState: initialRealState,
  reducers: {
  }
});

export const {

} = realSlice.actions;

export default realSlice.reducer;