import { MonsterType, SpawnCategory } from "../../../Data";

export interface InfoData {
    pattern:string;
    hexType?:string;
    category: SpawnCategory;
    displayName: string;
    monsterType?: MonsterType
    additionalData?: string;
  }
  