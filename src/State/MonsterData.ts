export interface Spawn {
    id: number;
    type: string;
    descripton: string;
}

export interface MonsterData {
    name: string;
    spawns: Spawn[];

}