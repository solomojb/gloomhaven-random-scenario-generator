import React from "react"
import { HexGrid, Layout} from 'react-hexgrid';
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

  const calculateCoordinates2 = (originalCorners, size) => {
    const corners2x1 = [];
    corners2x1.push(originalCorners[1]);
    corners2x1.push(originalCorners[2]);
    corners2x1.push(originalCorners[3]);
    corners2x1.push(originalCorners[4]);
    corners2x1.push(originalCorners[5]);
    corners2x1.push(originalCorners[0]);
    const firstNewCorner = new Point(originalCorners[0].x + size.x, originalCorners[0].y);
    const deltaX = firstNewCorner.x - originalCorners[5].x;
    const deltaY = firstNewCorner.y - originalCorners[5].y;
    corners2x1.push(firstNewCorner);
    corners2x1.push(new Point(originalCorners[0].x + deltaX, originalCorners[0].y + deltaY));
    corners2x1.push(new Point(originalCorners[1].x + deltaX, originalCorners[1].y + deltaY));
    corners2x1.push(new Point(originalCorners[2].x + deltaX, originalCorners[2].y + deltaY));

    const corners2x12 = [];
    corners2x12.push(originalCorners[2]);
    corners2x12.push(originalCorners[1]);
    corners2x12.push(originalCorners[0]);
    corners2x12.push(originalCorners[5]);
    corners2x12.push(originalCorners[4]);
    corners2x12.push(originalCorners[3]);
    const firstNewCorner2 = new Point(originalCorners[3].x - size.x, originalCorners[3].y);
    const deltaX2 = firstNewCorner2.x - originalCorners[4].x;
    const deltaY2 = firstNewCorner2.y - originalCorners[4].y;
    corners2x12.push(firstNewCorner2);
    corners2x12.push(new Point(originalCorners[3].x + deltaX2, originalCorners[3].y + deltaY2));
    corners2x12.push(new Point(originalCorners[2].x + deltaX2, originalCorners[2].y + deltaY2));
    corners2x12.push(new Point(originalCorners[1].x + deltaX2, originalCorners[1].y + deltaY2));

    const corners2x13 = [];
    corners2x13.push(originalCorners[2]);
    corners2x13.push(originalCorners[3]);
    corners2x13.push(originalCorners[4]);
    corners2x13.push(originalCorners[5]);
    corners2x13.push(originalCorners[0]);
    corners2x13.push(originalCorners[1]);
    const offsetY = originalCorners[2].y - originalCorners[4].y;
    const firstNewCorner3 = new Point(originalCorners[0].x, originalCorners[0].y + offsetY);
    const deltaX3 = firstNewCorner3.x - originalCorners[0].x;
    const deltaY3 = firstNewCorner3.y - originalCorners[0].y;
    corners2x13.push(firstNewCorner3);
    corners2x13.push(new Point(originalCorners[1].x + deltaX3, originalCorners[1].y + deltaY3));
    corners2x13.push(new Point(originalCorners[2].x + deltaX3, originalCorners[2].y + deltaY3));
    corners2x13.push(new Point(originalCorners[3].x + deltaX3, originalCorners[3].y + deltaY3));

    return {
      "2x1": corners2x1.map(point => `${point.x},${point.y}`).join(' '), 
      "2x12": corners2x12.map(point => `${point.x},${point.y}`).join(' '),
      "2x13": corners2x13.map(point => `${point.x},${point.y}`).join(' ')
    }
  }

  return <div className={className}>
        <HexGrid width={500} height={640}>
          {/* Grid with manually inserted hexagons */}
          <Layout size={{ x: 6.2, y: 6.2 }} flat={!rotateHex} spacing={1} origin={{ x: 0, y: 0 }} addCustomLayouts={calculateCoordinates2}>
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