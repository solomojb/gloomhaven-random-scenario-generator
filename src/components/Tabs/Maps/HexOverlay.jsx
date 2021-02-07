import React, { useCallback } from "react"
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
// import MapOverlayTile from "./MapOverlayTile";
// import MapSpawnPoint from "./MapSpawnPoint";

const allHexColumns = [
  { q: 4,
    minR: -7,
    maxR: 2,
  },
  { q: 3,
    minR: -6,
    maxR: 3,
  },
  { q: 2,
    minR: -6,
    maxR: 3,
  },
  { q: 1,
    minR: -5,
    maxR: 4,
  },
  { q: 0,
    minR: -5,
    maxR: 4,
  },
  { q: -1,
    minR: -4,
    maxR: 5,
  },
  { q: -2,
    minR: -4,
    maxR: 5,
  },
  { q: -3,
    minR: -3,
    maxR: 5,
  },
  { q: -4,
    minR: -3,
    maxR: 6,
  }
]

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