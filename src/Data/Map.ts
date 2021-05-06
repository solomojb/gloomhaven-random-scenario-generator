export interface HexColumn {
    q: number;
    minR: number;
    maxR: number;
}

export interface Map {
    tiles: string[],
    rotateHex: boolean;
    hexColumns: HexColumn[];
}

export const initialMap: Map = {
    tiles: [],
    rotateHex: false,
    hexColumns: [],
}