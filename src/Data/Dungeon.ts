import { initialMap, Map } from "./Map";
import { OverlayTile } from "./OverlayTile";
import { SpawnPoint } from "./SpawnPoint";

export interface Dungeon {
    map: Map;
    spawnPoints: SpawnPoint[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    maxRows: number;
    maxColumns: number;
}

export const initialDungeon : Dungeon = {
    map : initialMap,
    spawnPoints: [],
    obstacles: [],
    corridors: [],
    maxRows: 0,
    maxColumns: 0,
    
}