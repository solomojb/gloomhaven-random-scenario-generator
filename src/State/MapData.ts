export interface Pos {
    row: number;
    col: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface SpawnPoint {
    id: number;
    pos: Pos;
}

export interface MapData {
    tile: string;
    name: string;
    offset: Point;
    spawnPoints: SpawnPoint[];
}