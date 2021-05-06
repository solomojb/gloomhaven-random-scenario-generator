import React, { useEffect, useState } from "react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexOverlay from "../Tabs/Maps/HexOverlay";
import { useGame } from "../Game/GameProvider";

const Map = () => {
  const {dungeon: {name}
} = useDungeon();
const game = useGame();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(game.getMapPath(name))
  },[name, game, setPathName]);

  console.log("rendering map");

  return (
    <div className="map">
        <div>
          <img src={pathName}/>
        </div>
        <HexOverlay/>
    </div>
  );
};

export default Map;
