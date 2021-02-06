import { initialMap, Map } from "./Map";
import { OverlayTile } from "./OverlayTile";
import { SpawnPoint } from "./SpawnPoint";

export interface Dungeon {
    map: Map;
    spawnPoints: SpawnPoint[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
}

export const initialDungeon : Dungeon = {
    map : initialMap,
    spawnPoints: [],
    obstacles: [],
    corridors: []
}