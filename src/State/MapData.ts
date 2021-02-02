export interface SpawnPoint {
    id: number;
    row: number;
    column: number;
}

export interface Obstacle {
    type: number;
    row: number;
    column: number;
    rotation: number;
    scale: number;
}


export interface MapData {
    tile: string;
    name: string;
    offsetX: number;
    offsetY: number;
    rotation: number;
    rotateHex: boolean;
    scale: number;
    spawnPoints: SpawnPoint[];
    obstacles: Obstacle[];
    maxRows: number;
    maxColumns: number;
}