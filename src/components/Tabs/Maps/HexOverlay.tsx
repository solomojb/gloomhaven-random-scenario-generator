import React from "react"
import { HexGrid } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import MapGrid from "../../Grids/MapGrid";
import OverlayTileLayer from "../../Grids/OverlayTileLayer";
import SpawnPointsLayer from "../../Grids/SpawnPointsLayer";
import SpawnLayer from "../../Grids/SpawnLayer";
import DoorLayer from "../../Grids/DoorLayer";
import { ShowFlags } from "../../Providers/FlagsProvider";

const HexOverlay = () => { 
  const { dungeon: {obstacles, corridors, difficultTerrain}} = useDungeon();

  const { hexes: gridHexes, patterns: gridPatterns} = MapGrid();
  const { hexes: corridorHexes, patterns: corridorPatterns} = OverlayTileLayer({overlayType:"corridors", tiles:corridors, flag: ShowFlags.Corridors});
  const { hexes: obstacleHexes, patterns: obstaclePatterns} = OverlayTileLayer({overlayType:"obstacles", tiles:obstacles, flag: ShowFlags.Obstacles});
  const { hexes: difficultTerrainHexes, patterns: difficultTerrainPatterns} = OverlayTileLayer({overlayType:"difficult-terrain", tiles:difficultTerrain, flag: ShowFlags.Obstacles});
  const { hexes: spawnPointHexes, patterns: spawnPointPatterns} = SpawnPointsLayer();
  const { hexes: spawnHexes, patterns: spawnPatterns} = SpawnLayer();
  const { hexes: doorHexes, patterns: doorPatterns} = DoorLayer();

  return <div className="map-grid">
        <HexGrid width={500} height={640}>
          {/* Grid with manually inserted hexagons */}
            {gridHexes}
            {corridorHexes}
            {spawnPointHexes}
            {obstacleHexes}
            {difficultTerrainHexes}
            {spawnHexes}
            {doorHexes}
            {/* <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} /> */}
            {gridPatterns}
            {corridorPatterns}
            {spawnPointPatterns}
            {obstaclePatterns}
            {difficultTerrainPatterns}
            {spawnPatterns}
            {doorPatterns}
        </HexGrid>
        </div>
}

export default HexOverlay;