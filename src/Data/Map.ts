import { Tile } from "./Tile";

export interface Map {
    name: string;
    tiles: Tile[];
    rotateHex: boolean;
    offsetX: number;
    offsetY: number;
}

export const initialMap: Map = {
    name: "",
    tiles: [],
    rotateHex: false,
    offsetX: 0,
    offsetY: 0,
}