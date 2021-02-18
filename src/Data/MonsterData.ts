import { Spawn } from "./Spawn";

export interface MonsterData {
    name: string;
    traps: string[];
    spawns: Spawn[];
}

export const initialMonsterData = {
    name: "",
    traps: [],
    spawns: [],
}