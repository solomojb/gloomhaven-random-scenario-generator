export interface Spawn {
    id: number;
    displayName: string;
    type: string;
    category: string;
    descripton: string;
    monsterType: string[];
}

export interface MonsterData {
    name: string;
    spawns: Spawn[];

}

export const initialMonsterData = {
    name: "",
    spawns: [],
}