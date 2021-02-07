import React from "react"
import { HexGrid, Layout} from 'react-hexgrid';

const HexOverlay = (props) => { 
  const { hexes, className, patterns } = props;

  return <div className={className}>
        <HexGrid width={500} height={640}>
          {/* Grid with manually inserted hexagons */}
          <Layout size={{ x: 6.2, y: 6.2 }} flat={true} spacing={1} origin={{ x: 0, y: 0 }}>
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