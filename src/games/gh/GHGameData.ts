import { GameType } from '../../components/Game/GameType';
import { BaseGameData } from '../GameData'

class GHGameData extends BaseGameData  {
    constructor()
    {
        super("Gloomhaven", GameType.Gloomhaven);
    }

    getDungeonList() : string[] {
        return ["alcove", "altar", "armory", "burrow"];
    }

    getMonsterList() : string[] {
        return ["archaic", "corrupted", "crushing", "cutthroat"];
    }
}

export default GHGameData;
