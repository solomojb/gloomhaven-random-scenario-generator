import { Door } from "./Door";
import { initialMap, Map } from "./Map";
import { MonsterData } from "./MonsterData";
import { OverlayTile } from "./OverlayTile";

export interface Dungeon {
    name: string;
    traps: string[];
    entrances: Door[];
    exits: Door[];
    altMap: boolean;
    map: Map;
    spawnPoints: OverlayTile[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    difficultTerrain: OverlayTile[];
    penalties: string[];
    monsterData: MonsterData[];
}

export const initialDungeon : Dungeon = {
    name: "",
    altMap: false,
    traps:[],
    entrances: [],
    exits: [],
    map : initialMap,
    spawnPoints: [],
    obstacles: [],
    corridors: [],
    difficultTerrain: [],
    penalties: [],
    monsterData: []
}