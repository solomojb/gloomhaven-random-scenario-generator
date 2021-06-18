import React from "react"
import { HexGrid, LayoutProvider, HexUtils} from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import MapGrid from "../../Grids/MapGrid";
import OverlayTileLayer from "../../Grids/OverlayTileLayer";
import SpawnPointsLayer from "../../Grids/SpawnPointsLayer";
import SpawnLayer from "../../Grids/SpawnLayer";
import DoorLayer from "../../Grids/DoorLayer";
import { ShowFlags } from "../../Providers/FlagsProvider";

type Point = {
  x: number;
  y: number;
}

const getPoints =(corners: Point[], starting: number, count = 6) => {
  return [...Array(count)].map((_c, index) => corners[(index +starting)%6]);
}

export const createCustomLayouts = (flat: boolean, size: Point) => {
  const originalCorners = HexUtils.calculateCoordinates(flat, size);

  const drCorners = HexUtils.calculateCoordinates(flat, size, {x:1.5 * size.x, y:size.y/2 * Math.sqrt(3)});
  const dlCorners = HexUtils.calculateCoordinates(flat, size, {y:1.5 * size.x, x:-size.y/2 * Math.sqrt(3)});
  const dCorners = HexUtils.calculateCoordinates(flat, size, {x:0, y:size.y * Math.sqrt(3)});
  const d2x1 = [...getPoints(originalCorners,2), ...getPoints(dCorners,0,4)];

  const rCorners = HexUtils.calculateCoordinates(flat, size, {y:0, x:-size.x * Math.sqrt(3)});
  const lCorners = HexUtils.calculateCoordinates(flat, size, {y:0, x:size.x * Math.sqrt(3)});
  const r2x1 = [...getPoints(originalCorners,3,5), ...getPoints(rCorners, 0,5)];
  const triangle = [...getPoints(originalCorners, 2, 5), ...getPoints(drCorners,5,4), ...getPoints(dCorners,1,4)];
  const triangleA = [...getPoints(originalCorners,3,5), ...getPoints(dlCorners,5,4), ...getPoints(rCorners,1,4)];

  return {
      "2x1D": HexUtils.convertToString(d2x1),
      "2x1R": HexUtils.convertToString(r2x1),
      "2x3": HexUtils.convertToString(triangle),
      "2x3A": HexUtils.convertToString(triangleA),
  }
}

const HexOverlay = () => { 
  const { dungeon: {map: {rotateHex}, obstacles, corridors, difficultTerrain}} = useDungeon();

  const size = { x: 6.2, y: 6.2 };

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
          <LayoutProvider size={size} flat={!rotateHex} spacing={1} origin={{ x: 0, y: 0 }} customLayouts={createCustomLayouts(!rotateHex, size)}>
             {gridHexes}
             {corridorHexes}
             {spawnPointHexes}
             {obstacleHexes}
             {difficultTerrainHexes}
             {spawnHexes}
             {doorHexes}
            {/* <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} /> */}
          </LayoutProvider>
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