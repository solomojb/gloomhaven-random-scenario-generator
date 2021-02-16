import { GameType } from "./GameType";

export enum ShowFlags {
  Grid = 1 << 0,
  SpawnPoint = 1 << 1,
  Obstacles = 1 << 2,
  Corridors = 1 << 3,
  Spawns = 1 << 4,
  EditMode = 1<<5,
  AllGrid = 1<<6,
  Doors = 1<<7,
}

export interface ItemViewState {
  showFlags: number;
}

const initialItemViewState : ItemViewState = {
  showFlags: parseInt(localStorage.getItem("showFlags") || "" ) || ShowFlags.Obstacles | ShowFlags.Spawns | ShowFlags.Corridors,
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
