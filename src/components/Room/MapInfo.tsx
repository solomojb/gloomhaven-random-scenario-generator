import React from "react";
import { Text } from "../../react-hexgrid";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { usePlayerCount } from "../Providers/PlayerCountProvider";
import { getOverlayInfo, getOverlayName } from "./MapInfoOverlay";
import { GridTile } from "../Grids/GridTile";

const MapInfo = () => {
  const {
    dungeon: { obstacles, corridors, difficultTerrain },
    monsterData: { spawns, traps },
  } = useDungeon();

  const createEffectHexAndPattern = (traps:string[], q:number, r:number) => {
    return traps.map((status, index) => {
        return <GridTile q={q+index+1} r={r} id={status} category="status"/>
    });
  }

  const createTextHex = (q: number, r:number, text: string) => {
    return <Text q={q} r={r} text={text}></Text>
  }
  

  const { playerCount} = usePlayerCount();

  console.log(spawns);

  const monsterInfo = Object.entries(spawns).filter( ([type, spawn]) => spawn.category === "monster").flatMap( ([type, spawn]) => {
    const initialMonster:InfoData = {
      pattern: type,
      category: "monster",
      displayName: type,
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
          displayName: `${type} (Elite) x ${counts["elite"]}`,
          monsterType: "elite"
        })
    }
    if (counts["normal"] > 0) {
      info.push({
          ...initialMonster,
          displayName: `${type} x ${counts["normal"]}`,
          monsterType: "normal"
        })
    }
  
    return info;
  })

  const nonMonsters = Object.entries(spawns).filter(function([type, spawn]){ return spawn.category !== "monster";});
  const nonTreasuresInfo = nonMonsters.filter(([type, spawn]) => spawn.category !== "treasures").flatMap( ([type, spawn]) => {
    const { data} = spawn;
    const newInfo: InfoData = {
      pattern: type,
      category: spawn.category,
      displayName: `${getOverlayName(type)} x ${data.length}`,
      traps: spawn.category !=="traps" ? undefined : traps
    }
    return newInfo;
  })

  const treasuresInfo = Object.entries(spawns).filter( ([type, spawn]) => spawn.category === "treasures").flatMap( ([type, spawn]) => {
    const initTreasureData: InfoData = {
      pattern: type,
      category: spawn.category,
      displayName: type,
    }

    const data = spawn.data as string[];
    return Object.values(data).map((d, index) => {
      return {...initTreasureData, displayName: d, additionalData: (index + 1).toString()};
    })
  
  })

  const obstaclesInfo = getOverlayInfo(obstacles, "obstacles");
  const corridorsInfo = getOverlayInfo(corridors, "corridors");
  const difficultTerrainInfo = getOverlayInfo(difficultTerrain, "difficult-terrain");
  
  let hexes: JSX.Element[] = [];

  const buildHex = (q: number, r: number, data: InfoData) => {
    const {pattern,  additionalData, hexType} = data;
    return  <GridTile q={q} r={r} id={pattern} category={data.category} hexType={hexType}>
            {additionalData && <div style={{fontSize:"13pt", position:"absolute", top:4}}>{`${additionalData}`}</div>}
            </GridTile>
        
  }

  let q = -1;
  let r = -5; 
  const allInfo = [...monsterInfo, ...nonTreasuresInfo, ...obstaclesInfo, ...corridorsInfo, ...difficultTerrainInfo, ...treasuresInfo];

  allInfo.forEach(info => 
    {
      hexes.push(buildHex(q,r,info));
      let currentCount = hexes.length;
      if (info.category === "traps") {
        const trapHexes = createEffectHexAndPattern(info.traps!, q,r);
        hexes = hexes.concat(trapHexes);
      }
      if (info.displayName) {
        hexes.push(createTextHex(q + 1 + hexes.length - currentCount, r, info.displayName));
      }
      if (info.monsterType === "elite") {
        hexes.push(buildHex(q,r,{pattern:"EliteOverlay", category:"monster", displayName:""}));
      }
      r += 1;
      q -= 1;
      if (r % 2 === 0) {
        q +=1;
      }      

    });

   
  return (
    <div className="map-info">
      <div className="map-info-grid">
        {hexes}
      </div>
    </div>
  );
};

export default MapInfo;
