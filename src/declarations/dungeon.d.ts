interface Dungeon {
    name: string;
    traps: string[];
    entrances: Door[];
    exits: Door[];
    map: Map;
    spawnPoints: OverlayTile[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    difficultTerrain: OverlayTile[];
    penalties: string[];
    monsterData: MonsterData[];
}
