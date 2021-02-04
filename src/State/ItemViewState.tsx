import { GameType } from "./GameType";
import { MapData, Tile } from "./MapData";

export enum ShowFlags {
  Grid = 1 << 0,
  SpawnPoint = 1 << 1,
  Obstacles = 1 << 2,
  Corridors = 1 << 3,
  Spawns = 1 << 4,
  EditMode = 1<<5,
}

export interface ItemViewState {
  showFlags: number;
  numberOfPlayers: number;
  mapOffsetX: number;
  mapOffsetY: number;
  rotateHex: boolean;
}

const initialItemViewState : ItemViewState = {
  showFlags: parseInt(localStorage.getItem("showFlags") || "" ) || ShowFlags.Obstacles | ShowFlags.Spawns | ShowFlags.Corridors,
  numberOfPlayers: parseInt(localStorage.getItem("numberOfPlayers") || "") || 0,
  mapOffsetX: 0,
  mapOffsetY: 0,
  rotateHex: false,
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
