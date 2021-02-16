import { Door } from "./Door";
import { initialMap, Map } from "./Map";
import { MonsterData } from "./MonsterData";
import { OverlayTile } from "./OverlayTile";

export interface Dungeon {
    name: string;
    entrances: Door[];
    exits: Door[];
    map: Map;
    spawnPoints: OverlayTile[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    penalties: string[];
    monsterData: MonsterData[];
}

export const initialDungeon : Dungeon = {
    name: "",
    entrances: [],
    exits: [],
    map : initialMap,
    spawnPoints: [],
    obstacles: [],
    corridors: [],
    penalties: [],
    monsterData: []
}