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

export interface MapData {
    tiles: Tile[];
    name: string;
    offsetX: number;
    offsetY: number;
    rotateHex: boolean;
    spawnPoints: SpawnPoint[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    maxRows: number;
    maxColumns: number;
}

export const initialMapData : MapData = {
    tiles: [],
    name: "",
    offsetX: 0,
    offsetY: 0,
    rotateHex: false,
    spawnPoints: [],
    obstacles: [],
    corridors: [],
    maxRows: 0,
    maxColumns: 0,
    
}