import { Tile } from "./Tile";

export interface HexColumn {
    q: number;
    minR: number;
    maxR: number;
}

export interface Map {
    tiles: Tile[];
    rotateHex: boolean;
    hexColumns: HexColumn[];
}

export const initialMap: Map = {
    tiles: [],
    rotateHex: false,
    hexColumns: [],
}