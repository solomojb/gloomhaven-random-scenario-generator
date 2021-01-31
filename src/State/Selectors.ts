import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { ItemViewState } from "./ItemViewState";
import { RootState } from "./Reducer";

const itemViewStateSelector = createSelector(
    (state: RootState) => state.stateReducer,
    (realState) => {
        const state = realState.itemViewMap[realState.currentGameType];
        if (state === undefined) {
          throw new Error("Wrong type");
        }
        return state as ItemViewState;
      }
  );

  export const getItemViewState = () : ItemViewState => {
    return useSelector(itemViewStateSelector);
  }
