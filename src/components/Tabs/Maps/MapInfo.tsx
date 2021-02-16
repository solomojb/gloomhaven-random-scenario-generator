import React from "react";
import { OverlayTile, Spawn } from "../../../Data";
import { Hexagon, HexGrid, Layout, Text } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "./Grids/HexPattern";

type Props = {};

export type MapDataInfo = {
  count: number;
  displayName:string;
  category: string;
};

export type MonsterCount = {
  [k in string]: MapDataInfo;
};

const MapInfo = (props: Props) => {
  const {
    dungeon: { obstacles, corridors },
    monsterData: { spawns },
  } = useDungeon();
  const {} = props;
  const counts: MonsterCount = {};

  const addToCount = (type:string, category: string, displayName: string) => {
    let countData = counts[type];
    if (!countData) {
      countData = { count: 1, category, displayName };
    } else {
      countData.count += 1;
    }
    counts[type] = countData;    

  }

  const addSpawn = (spawn: Spawn) => {
    const { type, category, displayName } = spawn;
    addToCount(type, category, displayName);
  }

  const addOverlay = (overlay: OverlayTile, category: string) => {
    const { pattern, displayName } = overlay;
    addToCount(pattern, category, displayName);
  }

  spawns.filter(s => s.category === "monster").forEach(addSpawn);
  spawns.filter(s => s.category !== "monster").forEach(addSpawn);

  obstacles.forEach( obstacle => addOverlay(obstacle, "obstacles"));
  if (corridors) {
      corridors.forEach( corridor => addOverlay(corridor, "corridors"));
  }

  const hexes: JSX.Element[] = [];
  const patterns: JSX.Element[] = [];

  const size = { x: 10, y: 10 };
  const buildHex = (q: number, r: number, pattern: string, count: number, displayName: string) => {
    return <Hexagon q={q} r={r} s={0} fill={`${pattern.replace(" ", "-")}info`}>.l
            <Text y={15}  textStyle={{fontSize:'3pt', wordWrap: "break-word"}}>{`${displayName || pattern} ${count > 0 ? `x ${count}` : ''}`}</Text>
        </Hexagon>
  }

  let q = -4;
  let r = -3; 
  let nextR = r + 2;
  Object.keys(counts).forEach((pattern) => {
    const { category, count, displayName } = counts[pattern];
    if (category) {
        hexes.push(buildHex(q,r, pattern, category !== "monster" ? count : 0, displayName))
        patterns.push(<HexPattern id={pattern} postfix="info" category={category} size={size} useRotate={false}/>)
        q += 2;
        if (q > 4) {
            q = -4;
        }
        r -= 1;
        if (q < -3) {
            r = nextR;
            nextR += 2;
        }
    }});
   
  return (
    <HexGrid width={500} height={300}>
      <Layout
        size={size}
        origin={{ x: 0, y: 50 }}
      >
        {hexes}
      </Layout>
      {patterns}
    </HexGrid>
  );
};

export default MapInfo;
