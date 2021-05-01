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
    Coin = "coin",
    Corridors = "corridors"
}

export interface Spawn {
    data: number[] | MonsterType[][] | string[];
    type: string;
    category: SpawnCategory;
}
