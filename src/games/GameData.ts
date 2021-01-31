import { GameType } from "../State/GameType";
import { MapData } from "../State/MapData"

export const LOCAL_STORAGE_PREFIX:string = "RSG_";

export abstract class BaseGameData {
    name: string;
    gameType: GameType;
    mapItems: Array<MapData>;
    constructor(name:string, gameType:GameType){
        this.name = name;
        this.gameType = gameType;
        this.mapItems = require(`./${this.gameType}/maps.json`);;
    }

    get localStorageKey() {
        return LOCAL_STORAGE_PREFIX + this.gameType;
    }

    getMapPath(mapData:MapData) {
        return require(`../../vendor/${this.gameType}/images/map-tiles/${mapData.name}.png`);
    }
}

export default BaseGameData;
