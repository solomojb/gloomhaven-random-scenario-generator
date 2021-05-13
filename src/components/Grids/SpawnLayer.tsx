import React from "react";
import { Hexagon, Text } from "../../react-hexgrid";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexPattern from "./HexPattern";
import { usePlayerCount } from "../Providers/PlayerCountProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";

const SpawnLayer = () => {
  const { isFlagSet } = useFlags();
  const { dungeon: {map: {rotateHex}}} = useDungeon();
  const { playerCount } = usePlayerCount();
  const {
    dungeon: { spawnPoints },
    monsterData: { spawns },
  } = useDungeon();

  const buildHex = (spawnPoint: OverlayTile, pattern: string, text?:string|number) => {
    const { q, r } = spawnPoint;
    return <Hexagon key={`SpawnLayer-${q}-${r}-${pattern}`}q={q} r={r} s={0} fill={pattern.replace(" ", "-")}>
      {text && <Text y={-1.2}>{text}</Text>}
      </Hexagon>
  };
  const hexes: JSX.Element[] = [];
  let patterns: JSX.Element[] = [];

  const buildMonsterHex = (spawn: Spawn) => {
    const { type, data } = spawn;
    Object.keys(data).forEach( spawnPointId => {
      const spawnPoint = spawnPoints.find((overlayTile:OverlayTile) => overlayTile.id === parseInt(spawnPointId));
      if (spawnPoint) {
        const monsterTypes: MonsterType[] = data[parseInt(spawnPointId)] as MonsterType[];
        const monsterKey = monsterTypes[playerCount - 2];
        if (monsterKey !== "none") {
            hexes.push(buildHex(spawnPoint, type));
            if (monsterKey === "elite") {
              hexes.push(buildHex(spawnPoint, "EliteOverlay"));
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
          hexes.push(buildHex(spawnPoint, type, index + 1));
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
              hexes.push(buildHex(spawnPoint, type));
         }
        });
      }
    });

    patterns = spawns.map((spawn: Spawn) => {
      const { type, category } = spawn;
      if (category === "monster") {
        return (
          <HexPattern key={`SpawnLayer-${type}-patttern`} id={type} category={category} rotate={rotateHex} />
        );
      } else {
        return (
          <HexPattern
            key={`SpawnLayer-${type}-patttern`}
            id={type}
            category={category}
            rotate={rotateHex}
          />
        );
      }
    });

    patterns.push(
      <HexPattern
        key={`SpawnLayer-EliteOverlay-patttern`}
        id={"EliteOverlay"}
        category="monster"
        rotate={rotateHex}
      />
    );
  }

  return { hexes, patterns };
};

export default SpawnLayer;
