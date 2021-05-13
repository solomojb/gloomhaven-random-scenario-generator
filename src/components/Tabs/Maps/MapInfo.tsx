import React from "react";
import { Hexagon, HexGrid, Layout, Text } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "../../Grids/HexPattern";
import MapInfoGrid from "../../Grids/MapInfoGrid";
import { createCustomLayouts } from "../../../components/Tabs/Maps/HexOverlay"
import { usePlayerCount } from "../../Providers/PlayerCountProvider";
import { getOverlayInfo } from "./MapInfoOverlay";

const MapInfo = () => {
  const {
    dungeon: { obstacles, corridors },
    monsterData: { spawns, traps },
  } = useDungeon();
  const { playerCount} = usePlayerCount();

  const monsterInfo = spawns.filter( spawn => spawn.category === "monster").flatMap( spawn => {
    const initialMonster:InfoData = {
      pattern: spawn.type,
      category: "monster",
      displayName: spawn.type,
      // count: 0,
      monsterType: "elite"
    }

    const counts = {["elite"]:0, ["normal"]:0};
    const data = spawn.data as MonsterType[][];
    Object.values(data).forEach(d => {
      const monsterLevel = d[playerCount-2];
      if (monsterLevel !== "none") {
        counts[monsterLevel]++;
      }
    })

    const info: InfoData[] = [];
    if (counts["elite"] > 0) {
      info.push({
          ...initialMonster,
          displayName: `${spawn.type} (Elite) x ${counts["elite"]}`,
          monsterType: "elite"
        })
    }
    if (counts["normal"] > 0) {
      info.push({
          ...initialMonster,
          displayName: `${spawn.type} x ${counts["normal"]}`,
          monsterType: "normal"
        })
    }
  
    return info;
  })

  const nonMonsters = spawns.filter(function(value){ return value.category !== "monster";});
  const nonTreasuresInfo = nonMonsters.filter(spawn => spawn.category !== "treasures").flatMap( spawn => {
    const { data} = spawn;
    const newInfo: InfoData = {
      pattern: spawn.type,
      category: spawn.category,
      displayName: `${spawn.category !=="traps" ? spawn.type : traps.join(",")} x ${data.length}`
    }
    return newInfo;
  })

  const treasuresInfo = spawns.filter( spawn => spawn.category === "treasures").flatMap( spawn => {
    const initTreasureData: InfoData = {
      pattern: spawn.type,
      category: spawn.category,
      displayName: spawn.type,
    }

    const data = spawn.data as string[];
    return Object.values(data).map((d, index) => {
      return {...initTreasureData, displayName: d, additionalData: (index + 1).toString()};
    })
  
  })

  const obstaclesInfo = getOverlayInfo(obstacles, "obstacles");
  const corridorsInfo = getOverlayInfo(corridors, "corridors");
  
  let hexes: JSX.Element[] = [];
  let patterns: JSX.Element[] = [];

  const size = { x: 6.2, y: 6.2 };
  const buildMonsterHex = (q: number, r: number, data: InfoData) => {
    const {pattern, displayName, monsterType, additionalData} = data;
    return <div key={`MapInfo-${q}-${r}-${pattern}-patttern`}>
            <Hexagon key={`MapInfo-${q}-${r}-${pattern}-patttern`} q={q} r={r} s={0} fill={`${pattern.replace(" ", "-")}info`}>
              <Text x={8} y={0} textAnchor="start" textStyle={{fontSize:'3pt', wordWrap: "break-word"}}>{displayName}</Text>
              {additionalData && <Text x={.5} y={-1.3}>{additionalData}</Text>}
            </Hexagon>
            {monsterType === "elite" && <Hexagon key={`MapInfo-${q}-${r}-EliteOverlay-patttern`} q={q} r={r} s={0} fill={"EliteOverlayinfo"}/>}
          </div>
        
  }

  const { hexes: mapGridHexes, patterns: mapGridPatterns} = MapInfoGrid();

  hexes = hexes.concat(mapGridHexes.flat());
  patterns = patterns.concat(mapGridPatterns);
  patterns.push(<HexPattern key={`MapInfo-EliteOverlay-patttern`} id={"EliteOverlay"} postfix="info" category={"monster"} rotate={true}/>)

  let q = -1;
  let r = -5; 
  const allInfo = [...monsterInfo, ...nonTreasuresInfo, ...obstaclesInfo, ...corridorsInfo, ...treasuresInfo];

  allInfo.forEach(info => 
    {
      hexes.push(buildMonsterHex(q,r,info));
    
      r += 1;
      q -= 1;
      if (r % 2 === 0) {
        q +=1;
      }      
      
      patterns.push(<HexPattern key={`MapInfo-${q}-${r}-${info.pattern}-patttern`} id={info.pattern} postfix="info" category={info.category || ""} rotate={true} hexType={info.hexType}/>)
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
