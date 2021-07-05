import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../../react-hexgrid";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexOverlay from "../Grids/HexOverlay";
import { useGame } from "../Game/GameProvider";

const GRID_SIZE = 31;

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
          <LayoutProvider size={{x:GRID_SIZE, y:GRID_SIZE}} flat={!rotateHex} origin={{x:219,y:292}}>
            <HexOverlay/>
          </LayoutProvider>
    </div>
  );
};

export default Map;
