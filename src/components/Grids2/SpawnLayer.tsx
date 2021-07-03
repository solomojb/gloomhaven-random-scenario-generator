import React from "react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { usePlayerCount } from "../Providers/PlayerCountProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { useLayout } from "../../react-hexgrid-2/LayoutProvider";
import { GridTile } from "./GridTile";

const SpawnLayer = () => {
  const { isFlagSet } = useFlags();
  const { playerCount } = usePlayerCount();
  const {
    dungeon: { spawnPoints },
    monsterData: { spawns },
  } = useDungeon();
  const { size } = useLayout();

  const buildHex = (spawnPoint: OverlayTile, pattern: string, category: string, text?:string|number) => {
    const { q, r } = spawnPoint;
    return <GridTile q={q} r={r} id={pattern} category={category}>
      {text && <div style={{fontSize:size.x/2, position:"absolute", top:4}}>{`${text}`}</div>}
    </GridTile>
  };
  const hexes: JSX.Element[] = [];

  const buildMonsterHex = (spawn: Spawn) => {
    const { type, data } = spawn;
    Object.keys(data).forEach( spawnPointId => {
      const spawnPoint = spawnPoints.find((overlayTile:OverlayTile) => overlayTile.id === parseInt(spawnPointId));
      if (spawnPoint) {
        const monsterTypes: MonsterType[] = data[parseInt(spawnPointId)] as MonsterType[];
        const monsterKey = monsterTypes[playerCount - 2];
        if (monsterKey !== "none") {
            hexes.push(buildHex(spawnPoint, type, "monster"));
            if (monsterKey === "elite") {
              hexes.push(buildHex(spawnPoint, "EliteOverlay", "monster"));
            }
          }
      }
    })
  }

  const buildTreasureHex = (spawn: Spawn) => {
    const { type, data } = spawn;
    Object.keys(data).forEach( (spawnPointId, index) => {
      const spawnPoint = spawnPoints.find((overlayTile:OverlayTile) => overlayTile.id === parseInt(spawnPointId));
      if (spawnPoint) {
          hexes.push(buildHex(spawnPoint, type, "treasures", index + 1));
      }
    })
  }

  if (isFlagSet(ShowFlags.Spawns)) {
    spawns.forEach((spawn:Spawn) => {
      const { type, data, category } = spawn;
      if (category === "monster") {
        buildMonsterHex(spawn);
      } 
      else if (category === "treasures") {
        buildTreasureHex(spawn);
      }
      else {
        const spawnArr = data as number[];
        spawnArr.forEach( (id: number) => {
        const spawnPoint = spawnPoints.find((spawn:OverlayTile) => spawn.id === id);
         if (spawnPoint) {
              hexes.push(buildHex(spawnPoint, type, category));
         }
        });
      }
    });
  }

  return hexes;
};

export default SpawnLayer;
