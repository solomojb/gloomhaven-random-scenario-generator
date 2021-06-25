import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../../react-hexgrid";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexOverlay from "../Tabs/Maps/HexOverlay";
import { useGame } from "../Game/GameProvider";

const Map = () => {
  const {dungeon: {name, map:{rotateHex}}
} = useDungeon();
const game = useGame();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(game.getMapPath(name))
  },[name, game, setPathName]);

  return (
    <div className="map">
        <div>
          <img src={pathName}/>
        </div>
        <LayoutProvider flat={!rotateHex}>
          <HexOverlay/>
        </LayoutProvider>
    </div>
  );
};

export default Map;
