import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../../react-hexgrid";
import { LayoutProvider as LayoutProvider2 } from "../../react-hexgrid-2";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexOverlay from "../Tabs/Maps/HexOverlay";
import HexOverlay2 from "../Grids2/HexOverlay2";
import { useGame } from "../Game/GameProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";

const GRID_SIZE = 31;

const Map = () => {
  const {dungeon: {name, map:{rotateHex}}
} = useDungeon();
const game = useGame();
  const [pathName, setPathName] = useState("");
  const {isFlagSet} = useFlags();

  useEffect(() => {
    setPathName(game.getMapPath(name))
  },[name, game, setPathName]);

  const newHexGrid = isFlagSet(ShowFlags.NewHex)

  return (
    <div className="map">
        <div>
          <img src={pathName}/>
        </div>
        {newHexGrid ?
          <LayoutProvider2 size={{x:GRID_SIZE, y:GRID_SIZE}} flat={!rotateHex}>
            <HexOverlay2/>
          </LayoutProvider2>
        :
          <LayoutProvider flat={!rotateHex}>
            {newHexGrid ? <HexOverlay2/> : <HexOverlay/>}
          </LayoutProvider>
        }
    </div>
  );
};

export default Map;
