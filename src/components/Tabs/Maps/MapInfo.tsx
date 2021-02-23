import React from "react";
import { OverlayTile, Spawn, SpawnCategory } from "../../../Data";
import { Hexagon, HexGrid, Layout, Text } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "../../Grids/HexPattern";
import { Helpers } from "../../../helpers";
import MapGrid from "../../Grids/MapGrid";
import DungeonGrid from "../../Grids/DungonGrid";
import MapInfoGrid from "../../Grids/MapInfoGrid";

type Props = {};

export type MapDataInfo = {
  count: number;
  category: string;
};

export type MonsterCount = {
  [k in string]: MapDataInfo;
};

const getOverlayName = (pattern:string) => {
  if (pattern.includes("boulder")) {
    return "Boulder";
  } 
  if (pattern.includes("man-made-stone")) {
    return "Stone"
  }
  if (pattern.includes("coin-")) {
    return "Coin"
  }
  if (pattern.includes("hot-coals")) {
    return "Hot Coals"
  }
  return Helpers.toAllFirstUpper(pattern);
}

const MapInfo = (props: Props) => {
  const {
    dungeon: { obstacles, corridors },
    monsterData: { spawns },
  } = useDungeon();
  const {} = props;
  const counts: MonsterCount = {};

  const addToCount = (type:string, category: string) => {
    let countData = counts[type];
    if (!countData) {
      countData = { count: 1, category };
    } else {
      countData.count += 1;
    }
    counts[type] = countData;    

  }

  const addSpawn = (spawn: Spawn) => {
    const { type, category } = spawn;
    addToCount(type, category);
  }

  const addOverlay = (overlay: OverlayTile, category: string) => {
    const { pattern } = overlay;
    addToCount(pattern, category);
  }

  spawns.filter(s => s.category === "monster").forEach(addSpawn);
  spawns.filter(s => s.category !== "monster").forEach(addSpawn);

  obstacles.forEach( obstacle => addOverlay(obstacle, "obstacles"));
  if (corridors) {
      corridors.forEach( corridor => addOverlay(corridor, "corridors"));
  }

  let hexes: JSX.Element[] = [];
  let patterns: JSX.Element[] = [];

  const size = { x: 6.2, y: 6.2 };
  const buildHex = (q: number, r: number, pattern: string, count: number, displayName?: string) => {
    return <>
            <Hexagon q={q} r={r} s={0} fill={`${pattern.replace(" ", "-")}info`}>
              <Text x={8} y={0} textStyle={{fontSize:'3pt', wordWrap: "break-word"}}>{`${displayName || pattern} ${count > 0 ? `x ${count}` : ''}`}</Text>
            </Hexagon>
          </>
        
  }

  const { hexes: mapGridHexes, patterns: mapGridPatterns} = MapInfoGrid();

  hexes = hexes.concat(mapGridHexes.flat());
  patterns = patterns.concat(mapGridPatterns);

  let q = 0;
  let r = -5; 
  let nextR = r + 2;
  Object.keys(counts).forEach((pattern) => {
    const { category, count } = counts[pattern];
    if (category) {
        if (category === SpawnCategory.Monster) {
          hexes.push(buildHex(q,r, pattern, 0))
        } else if (category === SpawnCategory.Traps) {
          hexes.push(buildHex(q,r, pattern, 0, Helpers.toAllFirstUpper(pattern.replace("-trap","").replace("-", " "))))
        } else {
          hexes.push(buildHex(q,r, pattern, count, getOverlayName(pattern)))
        }
        patterns.push(<HexPattern id={pattern} postfix="info" category={category} size={size} forceRotate={true}/>)
        r += 1;
        q -= 1;
        if (r % 2 === 0) {
          q +=1;
        }
    }});
   
  return (
    <HexGrid width={500} height={640}>
      <Layout
        flat={false}
        size={size}
        origin={{ x: 0, y: 0 }}
      >
        {hexes}
      </Layout>
      {patterns}
    </HexGrid>
  );
};

export default MapInfo;
