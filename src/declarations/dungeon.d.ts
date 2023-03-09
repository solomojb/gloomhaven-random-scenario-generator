interface Dungeon {
    game: string;
    name: string;
    traps: string[];
    entrances: Door[];
    exits: Door[];
    map: Map;
    spawnPoints: OverlayTile[];
    obstacles: OverlayTile[];
    corridors: OverlayTile[];
    difficultTerrain: OverlayTile[];
    penaltyData: Record<string, string>;
    monsterData: MonsterData[];
}
