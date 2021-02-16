import React from "react"
import { HexGrid, Layout, HexUtils} from "../../../react-hexgrid";
import { ShowFlags } from "../../../State/ItemViewState";
import { useDungeon } from "./DungeonProvider";
import DungeonGrid from "../../Grids/DungonGrid";
import MapGrid from "../../Grids/MapGrid";
import OverlayTileLayer from "../../Grids/OverlayTileLayer";
import SpawnPointsLayer from "../../Grids/SpawnPointsLayer";
import SpawnLayer from "../../Grids/SpawnLayer";
import DoorLayer from "../../Grids/DoorLayer";

type Point = {
  x: number;
  y: number;
}

const HexOverlay = () => { 
  const { dungeon: {map: {rotateHex}, obstacles, corridors}} = useDungeon();

  const getPoints =(corners: Point[], starting: number, count = 6) => {
    return [...Array(count)].map((_c, index) => corners[(index +starting)%6]);
  }

  const createCustomLayouts = (flat: boolean, size: Point) => {
    const originalCorners = HexUtils.calculateCoordinates(flat, size);

    const dlCorners = HexUtils.calculateCoordinates(flat, size, {x: -1.5 * size.x, y:size.y/2 * Math.sqrt(3)});
    const dl2x1 = [...getPoints(originalCorners, 3),...getPoints(dlCorners, 1, 4)];

    const drCorners = HexUtils.calculateCoordinates(flat, size, {x:1.5 * size.x, y:size.y/2 * Math.sqrt(3)});
    const dr2x1 = [...getPoints(originalCorners,1), ...getPoints(drCorners, 4, 5)];

    const dCorners = HexUtils.calculateCoordinates(flat, size, {x:0, y:size.y * Math.sqrt(3)});
    const d2x1 = [...getPoints(originalCorners,2), ...getPoints(dCorners,0,4)];

    const triangle = [...getPoints(originalCorners, 2, 5), ...getPoints(drCorners,5,4), ...getPoints(dCorners,1,4)];

    return {
        "2x1DL": HexUtils.convertToString(dl2x1),
        "2x1DR": HexUtils.convertToString(dr2x1),
        "2x1D": HexUtils.convertToString(d2x1),
        "2x3": HexUtils.convertToString(triangle),
    }
  }

  const size = { x: 6.2, y: 6.2 };

  const { hexes: dungeonGridHexes, patterns: dungeonGridPatterns} = DungeonGrid();
  const { hexes: gridHexes, patterns: gridPatterns} = MapGrid();
  const { hexes: corridorHexes, patterns: corridorPatterns} = OverlayTileLayer({overlayType:"corridors", tiles:corridors, flag: ShowFlags.Corridors});
  const { hexes: obstacleHexes, patterns: obstaclePatterns} = OverlayTileLayer({overlayType:"obstacles", tiles:obstacles, flag: ShowFlags.Obstacles});
  const { hexes: spawnPointHexes, patterns: spawnPointPatterns} = SpawnPointsLayer();
  const { hexes: spawnHexes, patterns: spawnPatterns} = SpawnLayer();
  const { hexes: doorHexes, patterns: doorPatterns} = DoorLayer();

  return <div className="map-grid">
        <HexGrid width={500} height={640}>
          {/* Grid with manually inserted hexagons */}
          <Layout size={size} flat={!rotateHex} spacing={1} origin={{ x: 0, y: 0 }} customLayouts={createCustomLayouts(!rotateHex, size)}>
             {dungeonGridHexes}
             {gridHexes}
             {corridorHexes}
             {spawnPointHexes}
             {obstacleHexes}
             {spawnHexes}
             {doorHexes}
            {/* <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} /> */}
          </Layout>
            {dungeonGridPatterns}
            {gridPatterns}
            {corridorPatterns}
            {spawnPointPatterns}
            {obstaclePatterns}
            {spawnPatterns}
            {doorPatterns}
        </HexGrid>
        </div>
}

export default HexOverlay;