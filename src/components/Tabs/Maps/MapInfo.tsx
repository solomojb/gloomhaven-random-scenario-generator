import React from "react";
import { Hexagon, HexGrid, LayoutProvider, Text } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "../../Grids/HexPattern";
import { createCustomLayouts } from "../../../components/Tabs/Maps/HexOverlay"
import { usePlayerCount } from "../../Providers/PlayerCountProvider";
import { getOverlayInfo, getOverlayName } from "./MapInfoOverlay";

const MapInfo = () => {
  const {
    dungeon: { obstacles, corridors },
    monsterData: { spawns, traps },
  } = useDungeon();

  const createEffectHexAndPattern = (traps:string[], q:number, r:number) => {
    const hexes = traps.map((status, index) => {
        return <Hexagon q={q+index+1} r={r} s={0} fill={status}/>
    });
    const patterns = traps.map(status => {
      return <HexPattern id={status} category={"status"} rotate={false}/>
    });
    return {hexes, patterns};
  }
  

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
      displayName: `${spawn.category !=="traps" ? getOverlayName(spawn.type) : ""} x ${data.length}`,
      traps: spawn.category !=="traps" ? undefined : traps
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
  const buildHex = (q: number, r: number, data: InfoData) => {
    const {pattern, displayName, additionalData, traps} = data;
    const textWidth = traps ? traps.length : 0;
    return  <Hexagon key={`MapInfo-${q}-${r}-${pattern}-patttern`} q={q} r={r} s={0} fill={`${pattern.replace(" ", "-")}info`}>
              <Text x={8 + (textWidth * 11)} y={0} textAnchor="start" textStyle={{fontSize:'3pt', wordWrap: "break-word"}}>{displayName}</Text>
              {additionalData && <Text x={.5} y={-1.3}>{additionalData}</Text>}
            </Hexagon>
        
  }

  patterns.push(<HexPattern key={`MapInfo-EliteOverlay-patttern`} id={"EliteOverlay"} postfix="info" category={"monster"} rotate={true}/>)

  let q = -1;
  let r = -5; 
  const allInfo = [...monsterInfo, ...nonTreasuresInfo, ...obstaclesInfo, ...corridorsInfo, ...treasuresInfo];

  allInfo.forEach(info => 
    {
      hexes.push(buildHex(q,r,info));
      if (info.category === "traps") {
        const {hexes: trapHexes, patterns:trapPatterns} = createEffectHexAndPattern(info.traps!, q,r);
        hexes = hexes.concat(trapHexes);
        patterns = patterns.concat(trapPatterns);
      }
      if (info.monsterType === "elite") {
        hexes.push(buildHex(q,r,{pattern:"EliteOverlay", category:"monster", displayName:""}));
      }
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
        <LayoutProvider
          flat={false}
          spacing={1}
          size={size}
          origin={{ x: 0, y: 0 }}
          customLayouts={createCustomLayouts(false, size)}
        >
          {hexes}
        </LayoutProvider>
        {patterns}
      </HexGrid>
    </div>
  );
};

export default MapInfo;
