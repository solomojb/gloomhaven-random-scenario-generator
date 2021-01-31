import { GameType } from "./GameType";

export interface ItemViewState {
}

const initialItemViewState : ItemViewState = {
};

export type ItemViewStateMap = {
    [K in GameType]?: ItemViewState;
  };

export const initialItemViewStateMapState = Object.values(GameType).reduce(
    (acc, value: GameType) => {
      acc[value] = initialItemViewState;
      return acc;
    },
    {} as ItemViewStateMap,
  );


export default ItemViewStateMap;
