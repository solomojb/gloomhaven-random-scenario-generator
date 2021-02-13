import React from "react";
import { Hexagon, HexGrid, Layout, Text } from "react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "./Grids/HexPattern";

type Props = {};

export type MapDataInfo = {
  count: number;
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
  spawns.filter(s => s.category === "monster").forEach((spawn) => {
    const { type, category } = spawn;
    let countData = counts[type];
    if (!countData) {
      countData = { count: 1, category };
    } else {
      countData.count += 1;
    }
    counts[type] = countData;
  });

  spawns.filter(s => s.category !== "monster").forEach((spawn) => {
    const { type, category } = spawn;
    let countData = counts[type];
    if (!countData) {
      countData = { count: 1, category };
    } else {
      countData.count += 1;
    }
    counts[type] = countData;
  });

  obstacles.forEach( obstacle => {
      const { pattern } = obstacle;
      let countData = counts[pattern];
      if (!countData) {
          countData = { count: 1, category:"obstacles"}
      } else {
          countData.count += 1;
      }
      counts[pattern] = countData;
  })

  if (corridors) {
      corridors.forEach( corridor => {
          const { pattern } = corridor;
          let countData = counts[pattern];
          if (!countData) {
              countData = { count: 1, category:"corridors"}
          } else {
              countData.count += 1;
          }
          counts[pattern] = countData;
      })
  }

  const hexes: JSX.Element[] = [];
  const patterns: JSX.Element[] = [];

  const size = { x: 10, y: 10 };
  const buildHex = (q: number, r: number, pattern: string, count: number) => {
    return <Hexagon q={q} r={r} s={0} fill={`${pattern.replace(" ", "-")}info`}>
            <Text y={15}  textStyle={{fontSize:'3pt', wordWrap: "break-word"}}>{`${pattern} ${count > 0 ? `x ${count}` : ''}`}</Text>
        </Hexagon>
  }

  let q = -4;
  let r = -3; 
  let nextR = r + 2;
  Object.keys(counts).forEach((pattern) => {
    const { category, count } = counts[pattern];
    if (category) {
        hexes.push(buildHex(q,r, pattern, category !== "monster" ? count : 0))
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
