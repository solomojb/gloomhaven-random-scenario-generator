import React from "react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexOverlay from "../Tabs/Maps/HexOverlay";
import { useGame } from "../Game/GameProvider";

const Map = () => {
  const {dungeon: {name}
} = useDungeon();
const game = useGame();

  console.log("rendering map");

  return (
    <div className="map">
        <div>
          <img src={game.getMapPath(name)}/>
        </div>
        <HexOverlay/>
    </div>
  );
};

export default Map;
