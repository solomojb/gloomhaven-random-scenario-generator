export interface SpawnPoint {
    id: number;
    row: number;
    column: number;
}

export interface OverlayTile {
    type: string;
    row: number;
    column: number;
    rotation: number;
    scale: number;
}

export interface Tile {
    tile: string;
    rotation: number;
    scale: number;
    offsetX: number;
    offsetY: number;
}

export interface Map {
    name: string;
    tiles: Tile[];
    rotateHex: boolean;
    offsetX: number;
    offsetY: number;
}

export interface MapData {
    map: Map;
    spawnPoints: SpawnPoint[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    maxRows: number;
    maxColumns: number;
}

export const initialMapData : MapData = {
    map : {
        name: "",
        tiles: [],
        rotateHex: false,
        offsetX: 0,
        offsetY: 0,
    },
    spawnPoints: [],
    obstacles: [],
    corridors: [],
    maxRows: 0,
    maxColumns: 0,
    
}