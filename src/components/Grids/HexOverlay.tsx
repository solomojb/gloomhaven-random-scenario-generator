import React from "react"
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import MapGrid from "./MapGrid";
import SpawnPointsLayer from "./SpawnPointsLayer";
import OverlayTileLayer from "./OverlayTileLayer";
import SpawnLayer from "./SpawnLayer";
import { ShowFlags } from "../Providers/FlagsProvider";

import "../../components/Tabs/Maps/map.css"
import DoorLayer from "./DoorLayer";

const HexOverlay = () => { 
  const { dungeon: {obstacles, corridors, difficultTerrain}} = useDungeon();

  const gridHexes = MapGrid();
  const corridorHexes = OverlayTileLayer({overlayType:"corridors", tiles:corridors, flag: ShowFlags.Corridors});
  const obstacleHexes = OverlayTileLayer({overlayType:"obstacles", tiles:obstacles, flag: ShowFlags.Obstacles});
  const difficultTerrainHexes = OverlayTileLayer({overlayType:"difficult-terrain", tiles:difficultTerrain, flag: ShowFlags.Obstacles});
  const spawnPointHexes = SpawnPointsLayer();
  const spawnHexes = SpawnLayer();
  const doorHexes = DoorLayer();

  return <div className="map-grid">
          <div className="new-hex-grid"> 
            {/* Grid with manually inserted hexagons */}
              {gridHexes}
              {corridorHexes}
              {spawnPointHexes}
              {obstacleHexes}
              {difficultTerrainHexes}
              {spawnHexes}
              {doorHexes}
          </div>
        </div>
}

export default HexOverlay;