import { GameType } from "../State/GameType";
import { MapData } from "../State/MapData"
import { MonsterData } from "../State/MonsterData";

export const LOCAL_STORAGE_PREFIX:string = "RSG_";

export type DungeonMap = {
    [k in string]?: MapData;
  };

export type MonsterMap = {
[k in string]?: MonsterData;
};

export abstract class BaseGameData {
    name: string;
    gameType: GameType;
    dungeonData: DungeonMap;
    monsterData: MonsterMap;
    constructor(name:string, gameType:GameType){
        this.name = name;
        this.gameType = gameType;
        this.dungeonData = {};
        this.monsterData = {};
    }

    abstract getDungeonList() : string[];
    abstract getMonsterList() : string[];

    get localStorageKey() {
        return LOCAL_STORAGE_PREFIX + this.gameType;
    }

    getDungeonData(dungeonName:string) : MapData {
        if (!this.dungeonData[dungeonName]) {
            this.dungeonData[dungeonName] = require(`./${this.gameType}/Dungeons/${dungeonName}.json`);
        }
        return this.dungeonData[dungeonName] as MapData;
    }
    
    getMonsterData(monsterName:string) : MonsterData {
        if (!this.monsterData[monsterName]) {
            this.monsterData[monsterName] = require(`./${this.gameType}/Monsters/${monsterName}.json`);
        }
        return this.monsterData[monsterName] as MonsterData;
    }

    getOverlayTokenPath(token:string) {
        return require(`../../vendor/${this.gameType}/images/overlay-tokens/${token}.png`);
    }

    getMapPath(tile:string) {
        return require(`../../vendor/${this.gameType}/images/map-tiles/${tile}.png`);
    }
    getMapCard(name:string) {
        return require(`../../vendor/${this.gameType}/images/random-dungeons/dungeons/dungeon-${name}.png`);
    }

    getMonsterCard(name:string) {
        return require(`../../vendor/${this.gameType}/images/random-dungeons/monsters/monster-${name}.png`);
    }
}

export default BaseGameData;
