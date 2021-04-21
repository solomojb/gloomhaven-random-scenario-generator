import React from "react";
import { OverlayTile, Spawn, SpawnCategory } from "../../../Data";
import { Hexagon, HexGrid, Layout, Text } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import HexPattern, { getHexTypeOffsets } from "../../Grids/HexPattern";
import { Helpers } from "../../../helpers";
import MapInfoGrid from "../../Grids/MapInfoGrid";
import { createCustomLayouts } from "../../../components/Tabs/Maps/HexOverlay"

type Props = {};

export type MapDataInfo = {
  count: number;
  category: string;
  hexType: string;
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
  return Helpers.toAllFirstUpper(pattern.replace("-", " "));
}

const MapInfo = (props: Props) => {
  const {
    dungeon: { obstacles, corridors },
    monsterData: { spawns, traps },
  } = useDungeon();
  const {} = props;
  const counts: MonsterCount = {};

  const addToCount = (type:string, category: string, count: number = 1, hexType:string = "") => {
    let countData = counts[type];
    if (!countData) {
      countData = { count, category, hexType };
    } else {
      countData.count += count;
    }
    counts[type] = countData;    
  }

  const addSpawn = (spawn: Spawn) => {
    const { type, category, data} = spawn;
    addToCount(type, category, data.length);
  }

  const addOverlay = (overlay: OverlayTile, category: string) => {
    const { pattern, hexType } = overlay;
    addToCount(pattern, category, 1, hexType);
  }

  spawns.filter(s => s.category === "monster").forEach(addSpawn);
  spawns.filter(s => s.category !== "monster" && s.category !== "treasures").forEach(addSpawn);

  if (obstacles) {
    obstacles.forEach( obstacle => addOverlay(obstacle, "obstacles"));
  }
  if (corridors) {
      corridors.forEach( corridor => addOverlay(corridor, "corridors"));
  }

  let hexes: JSX.Element[] = [];
  let patterns: JSX.Element[] = [];

  const size = { x: 6.2, y: 6.2 };
  const buildHex = (q: number, r: number, pattern: string, count: number, displayName?: string, additionalData?:string, hexType?:string) => {
    return <>
            <Hexagon q={q + (hexType !== undefined ? 1 : 0)} r={r} s={0} fill={`${pattern.replace(" ", "-")}info`} hexType={hexType}>
              <Text x={8} y={0} textAnchor="start" textStyle={{fontSize:'3pt', wordWrap: "break-word"}}>{`${displayName || pattern} ${count > 0 ? `x ${count}` : ''}`}</Text>
              {additionalData && <Text x={.5} y={-1.3}>{additionalData}</Text>}
            </Hexagon>
          </>
        
  }

  const { hexes: mapGridHexes, patterns: mapGridPatterns} = MapInfoGrid();

  hexes = hexes.concat(mapGridHexes.flat());
  patterns = patterns.concat(mapGridPatterns);

  const getHexType = (hexType:string) => {
    if (hexType) {
      return hexType === "2x3" ? "2x3A" : "2x1R";
    }
    return undefined;
  }

  let q = 0;
  let r = -5; 
  Object.keys(counts).forEach((pattern) => {
    const { category, count, hexType } = counts[pattern];
    const displayedHexType = getHexType(hexType);
    if (category) {
        if (category === SpawnCategory.Monster) {
          hexes.push(buildHex(q,r, pattern, 0))
        } else if (category === SpawnCategory.Traps) {
          hexes.push(buildHex(q,r, pattern, count, traps.map(trap => trap).join(",")));
        } else {
          hexes.push(buildHex(q,r, pattern, count, getOverlayName(pattern), undefined, displayedHexType))
        }
        patterns.push(<HexPattern id={pattern} postfix="info" category={category} rotate={true} hexType={displayedHexType}/>)
        if (displayedHexType !== "2x3A") {
          r += 1;
          q -= 1;
          if (r % 2 === 0) {
            q +=1;
          }
        } else {
          r += 2;
          q -= 1;
          if (r % 2 === 0) {
            q +=1;
          }
        }
    }});

    const treasures = spawns.filter(s => s.category === "treasures");
    treasures.forEach( spawn => {
      const { type, category, data} = spawn;
      const treasureData = data as string[];
      Object.keys(treasureData).forEach( (key:string, index:number) => {
        hexes.push(buildHex(q, r, type, 0, treasureData[parseInt(key)], (index + 1).toString()));
        patterns.push(<HexPattern id={type} postfix="info" category={category} rotate={true}/>)
        r += 1;
        q -= 1;
        if (r % 2 === 0) {
          q +=1;
        }
        })
    });

   
  return (
    <div className="map-info">
      <HexGrid width={500} height={640} >
        <Layout
          flat={false}
          size={size}
          origin={{ x: 0, y: 0 }}
          customLayouts={createCustomLayouts(false, size)}
        >
          {hexes}
        </Layout>
        {patterns}
      </HexGrid>
    </div>
  );
};

export default MapInfo;
