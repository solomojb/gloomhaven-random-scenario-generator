export enum MonsterType {
    None = "none",
    Normal = "normal",
    Elite = "elite"
}

export enum SpawnCategory {
    Monster = "monster",
    Obstacle = "obstacles",
    Treasures = "treasures",
    DifficultTerrain = "difficult-terrain",
    HazardousTerrain = "hazardous-terrain",
    Traps = "traps",
    Coin = "coin"
}

export interface Spawn {
    data: number[] | MonsterType[][] | string[];
    displayName: string;
    type: string;
    category: SpawnCategory;
}
