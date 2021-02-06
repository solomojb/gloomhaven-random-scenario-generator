import { Tile } from "./Tile";

export interface HexColumn {
    q: number;
    minR: number;
    maxR: number;
}

export interface Map {
    name: string;
    tiles: Tile[];
    rotateHex: boolean;
    hexColumns: HexColumn[];
}

export const initialMap: Map = {
    name: "",
    tiles: [],
    rotateHex: false,
    hexColumns: [],
}