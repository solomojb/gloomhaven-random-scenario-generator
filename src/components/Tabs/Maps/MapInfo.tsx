import React from "react";
import { Text } from "../../../react-hexgrid";
import { useDungeon } from "./DungeonProvider";
import { usePlayerCount } from "../../Providers/PlayerCountProvider";
import { getOverlayInfo, getOverlayName } from "./MapInfoOverlay";
import { GridTile } from "../../Grids/GridTile";

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
      displayName: `${getOverlayName(spawn.type)} x ${data.length}`,
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
