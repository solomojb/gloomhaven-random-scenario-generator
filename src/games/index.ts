import GHGameData  from './gh/GHGameData';
import BaseGameData, {LOCAL_STORAGE_PREFIX} from './GameData';
import { GameType } from '../components/Game/GameType';

const gameDataTypes = {
    [GameType.Gloomhaven] : new GHGameData(),
}

export {gameDataTypes, BaseGameData, LOCAL_STORAGE_PREFIX};
