import { GameType } from "./GameType";

export interface ItemViewState {
  showGrid: boolean;
  numberOfPlayers: number;
}

const initialItemViewState : ItemViewState = {
  showGrid: false,
  numberOfPlayers: 0,
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
