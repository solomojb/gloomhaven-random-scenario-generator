import { GameType } from '../../State/GameType';
import { BaseGameData } from '../GameData'

class GHGameData extends BaseGameData  {
    constructor()
    {
        super("Gloomhaven", GameType.Gloomhaven);
    }

    getDungeonList() : string[] {
        return ["alcove", "altar"];
    }
}

export default GHGameData;
