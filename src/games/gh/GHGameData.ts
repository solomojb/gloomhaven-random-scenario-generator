import { GameType } from '../../components/Game/GameType';
import { BaseGameData } from '../GameData'

class GHGameData extends BaseGameData  {
    constructor()
    {
        super("Gloomhaven", GameType.Gloomhaven);
    }

    getDungeonList() : string[] {
        return [
            "alcove", 
            "altar", 
            "armory", 
            "burrow", 
            "cabin",
            "cave",
            "clearing",
            "corridor",
            "crossroads",
            "dead-end",
            "den",
            "encampment",
            "hallway",
            "hovel",
            "library",
            "passage",
            "road",
            "sewer",
            "trail",
            "tunnel",
        ];
    }

    getMonsterList() : string[] {
        return [
                "archaic",
                // "arid",
                "corrupted", 
                "crushing", 
                "cutthroat", 
                "defiled",
                "drowned",
                // "ethereal", // fc
                "foggy",
                "fortified",
                "frigid",
                "hopeless",
                "horrific",
                "infected",
                "mangy",
                "putrid",
                "rotting",
                "scaled",
                "tribal",
                "unstable",
                "venomous",
                "wild",
            ];
    }
}

export default GHGameData;
