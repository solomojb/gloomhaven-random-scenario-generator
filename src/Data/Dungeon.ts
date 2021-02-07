import { initialMap, Map } from "./Map";
import { OverlayTile } from "./OverlayTile";

export interface Dungeon {
    map: Map;
    spawnPoints: OverlayTile[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
}

export const initialDungeon : Dungeon = {
    map : initialMap,
    spawnPoints: [],
    obstacles: [],
    corridors: []
}