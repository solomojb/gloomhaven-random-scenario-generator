type MonsterType = "none" | "normal" | "elite";

type SpawnCategory  = "monster" | "obstacles" | "treasures" | "difficult-terrain" | "hazardous-terrain" | "traps" | "coin" | "corridors";

interface Spawn {
    data: number[] | MonsterType[][] | string[];
    type: string;
    category: SpawnCategory;
}

