import { GameType } from "../State/GameType";
import { MapData } from "../State/MapData"

export const LOCAL_STORAGE_PREFIX:string = "RSG_";

export type DungeonMap = {
    [k in string]?: MapData;
  };

export abstract class BaseGameData {
    name: string;
    gameType: GameType;
    dungeonData: DungeonMap;
    constructor(name:string, gameType:GameType){
        this.name = name;
        this.gameType = gameType;
        this.dungeonData = {};
    }

    abstract getDungeonList() : string[];

    get localStorageKey() {
        return LOCAL_STORAGE_PREFIX + this.gameType;
    }

    getDungeonData(dungeonName:string) {
        if( dungeonName === 'none') {
            return undefined;
        }
        if (!this.dungeonData[dungeonName]) {
            this.dungeonData[dungeonName] = require(`./${this.gameType}/Dungeons/${dungeonName}.json`);
        }
        return this.dungeonData[dungeonName];
    }

    getMapPath(tile:string) {
        return require(`../../vendor/${this.gameType}/images/map-tiles/${tile}.png`);
    }
    getMapCard(name:string) {
        return require(`../../vendor/${this.gameType}/images/random-dungeons/dungeons/dungeon-${name}.png`);
    }
}

export default BaseGameData;
