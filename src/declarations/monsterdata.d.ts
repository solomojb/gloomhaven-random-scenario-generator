interface MonsterData {
    name: string;
    traps: string[];
    spawns:  { [key: string]: Spawn };
    game?: string;
}