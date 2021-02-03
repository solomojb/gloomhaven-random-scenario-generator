export interface Spawn {
    id: number;
    type: string;
    category: string;
    descripton: string;
    monsterType: string[];
}

export interface MonsterData {
    name: string;
    spawns: Spawn[];

}