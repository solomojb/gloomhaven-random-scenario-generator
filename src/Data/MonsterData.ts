export interface Spawn {
    id: number;
    displayName: string;
    type: string;
    category: string;
    description: string;
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