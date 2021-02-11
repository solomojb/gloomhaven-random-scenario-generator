import React from "react"
import { HexGrid, Layout, HexUtils } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const HexOverlay = (props) => { 
  const { dungeon: {map: {rotateHex}}} = useDungeon();
  const { hexes, className, patterns } = props;

  const getPoints =(corners, starting, count = 6) => {
    return [...Array(count)].map((_c, index) => corners[(index +starting)%6]);
  }

  const createCustomLayouts = (flat, size) => {
    const originalCorners = HexUtils.calculateCoordinates(flat, size);

    const dlOffset = new Point(-1.5 * size.x, size.y/2 * Math.sqrt(3));
    const dlCorners = HexUtils.calculateCoordinates(flat, size, dlOffset);

    const dl2x1 = [...getPoints(originalCorners, 3),...getPoints(dlCorners, 1, 4)];

    const drOffset = new Point(1.5 * size.x, size.y/2 * Math.sqrt(3));
    const drCorners = HexUtils.calculateCoordinates(flat, size, drOffset);
    const dr2x1 = [...getPoints(originalCorners,1), ...getPoints(drCorners, 4, 5)];

    const dOffset = new Point(0, size.y * Math.sqrt(3));
    const dCorners = HexUtils.calculateCoordinates(flat, size, dOffset);
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

  return <div className={className}>
        <HexGrid width={500} height={640}>
          {/* Grid with manually inserted hexagons */}
          <Layout size={size} flat={!rotateHex} spacing={1} origin={{ x: 0, y: 0 }} customLayouts={createCustomLayouts(!rotateHex, size)}>
             {hexes}
            {/* <Hexagon q={1} r={0} s={1} /> */}
            {/* <Hexagon q={2} r={0} s={2} /> */}
            {/* <Hexagon q={-1} r={0} s={-1} /> */}
{/* 
            <Hexagon q={0} r={-1} s={1} fill="pat-1" />
            <Hexagon q={0} r={1} s={-1} />
            <Hexagon q={1} r={-1} s={0}>
              <Text>1, -1, 0</Text>
            </Hexagon>
            <Hexagon q={1} r={0} s={-1}>
              <Text>1, 0, -1</Text>
            </Hexagon>
            <Hexagon q={-1} r={1} s={0} fill="pat-2">
              <Text>-1, 1, 0</Text>
            </Hexagon>
            <Hexagon q={-1} r={0} s={1} />
            <Hexagon q={-2} r={0} s={1} />
            <Path start={new Hex(0, 0, 0)} end={new Hex(-2, 0, 1)} /> */}
          </Layout>
            {patterns}
          {/*<Pattern id="pat-1" link="http://cat-picture" />
          <Pattern id="pat-2" link="http://cat-picture2" /> */}
        </HexGrid>
        </div>
    // const { dungeon: {map: {tiles}, spawnPoints, maxRows, maxColumns, obstacles, corridors } } = useDungeon();
    // const grid = [];
    // for (let row = 0; row < maxRows; row += 1) {
    //   for (let column = 0; column < maxColumns; column += 1) {
    //     grid.push(<MapSpawnPoint row={row} column={column}>
    //       <MapOverlayTile category={"corridors"} tileName={"wood-1"}/>
    //       <div className="map-spawn-id">{`${row},${column}`}</div>
    //     </MapSpawnPoint>)
    //   }
    // }
    // return <div>{grid}</div>;
}

export default HexOverlay;