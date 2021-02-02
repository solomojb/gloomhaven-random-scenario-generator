export interface SpawnPoint {
    id: number;
    row: number;
    column: number;
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
}