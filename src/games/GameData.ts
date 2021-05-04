import { Dungeon, MonsterData } from "../Data";
import { GameType } from "../components/Game/GameType";
import { Helpers } from "../helpers";

export const LOCAL_STORAGE_PREFIX:string = "RSG_";

export type DungeonMap = {
    [k in string]?: Dungeon;
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

    getDungeonData(dungeonName:string) : Dungeon {
        if (!this.dungeonData[dungeonName]) {
            this.dungeonData[dungeonName] = require(`./${this.gameType}/Dungeons/${dungeonName}.json`);
        }
        return this.dungeonData[dungeonName] as Dungeon;
    }

    getRandomDungeons() : Dungeon[] {
        return Helpers.shuffle(this.getDungeonList().map(name => this.getDungeonData(name)))
    }
    
    getRandomMonsters() : MonsterData[] {
        return Helpers.shuffle(this.getMonsterList().map(name => this.getMonsterData(name)))
    }
    
    getMonsterData(monsterName:string) : MonsterData {
        if (!this.monsterData[monsterName]) {
            this.monsterData[monsterName] = require(`./${this.gameType}/Monsters/${monsterName}.json`);
        }
        return this.monsterData[monsterName] as MonsterData;
    }

    getOverlayTokenPath(token:string, category: string) {
        const filename = `${token.toLowerCase().replace(" ", "-")}.png`;
        return require(`../../vendor/${this.gameType}/images/overlay-tokens/${category}/${filename}`);
    }
    
    getMonsterImage(token:string, rotatedHex:boolean) {
        return require(`../img/Monsters/${rotatedHex?"Vert":"Horz"}-${token}.png`);
    }

    getTreasureImage(rotatedHex:boolean) {
        return require(`../img/treasures/${rotatedHex?"Vert":"Horiz"}-treasure.png`);
    }
    
    getCoinImage() {
        return this.getOverlayTokenPath("coin-1", "treasures");
    }

    getDoorImage(type:string, aOrB:string, rotatedHex:boolean) {
        return require(`../img/doors/${rotatedHex?"Vert":"Horiz"}-${type}${aOrB}.png`);
    }

    getMapPath(tile:string) {
        return require(`../../vendor/${this.gameType}/images/map-tiles/${tile}.png`);
    }
    getAltMapPath(tile:string) {
        return require(`../img/maps/${tile}.png`);
    }

    getMapCard(name:string) {
        return require(`../../vendor/${this.gameType}/images/random-dungeons/dungeons/dungeon-${name}.png`);
    }

    getMonsterCard(name:string) {
        return require(`../../vendor/${this.gameType}/images/random-dungeons/monsters/monster-${name}.png`);
    }
}

export default BaseGameData;
