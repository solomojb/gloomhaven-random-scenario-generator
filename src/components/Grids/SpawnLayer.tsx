import React from "react";
import { Hexagon, Text } from "../../react-hexgrid";
import { OverlayTile, SpawnCategory, MonsterType, Spawn } from "../../Data";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexPattern from "./HexPattern";
import { usePlayerCount } from "../Providers/PlayerCountProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";

const SpawnLayer = () => {
  const { isFlagSet } = useFlags();
  const { playerCount } = usePlayerCount();
  const {
    dungeon: { spawnPoints },
    monsterData: { spawns },
  } = useDungeon();

  const buildHex = (spawnPoint: OverlayTile, pattern: string, text?:string|number) => {
    const { q, r } = spawnPoint;
    return <Hexagon q={q} r={r} s={0} fill={pattern.replace(" ", "-")}>
      {text && <Text y={-1.2}>{text}</Text>}
      </Hexagon>
  };
  const hexes: JSX.Element[] = [];
  let patterns: JSX.Element[] = [];
  let treasureCount = 1;

  const buildMonsterHex = (spawn: Spawn) => {
    const { type, data } = spawn;
    Object.keys(data).forEach( spawnPointId => {
      const spawnPoint = spawnPoints.find((overlayTile:OverlayTile) => overlayTile.id === parseInt(spawnPointId));
      if (spawnPoint) {
        const monsterTypes: MonsterType[] = data[parseInt(spawnPointId)] as MonsterType[];
        const monsterKey = monsterTypes[playerCount - 2];
        if (monsterKey !== MonsterType.None) {
            hexes.push(buildHex(spawnPoint, type));
            if (monsterKey === MonsterType.Elite) {
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
    spawns.forEach((spawn) => {
      const { type, data, category } = spawn;
      if (category === SpawnCategory.Monster) {
        buildMonsterHex(spawn);
      } 
      else if (category === SpawnCategory.Treasures) {
        buildTreasureHex(spawn);
      }
      else {
        const spawnArr = data as number[];
        spawnArr.forEach( (id: number) => {
        const spawnPoint = spawnPoints.find((spawn) => spawn.id === id);
         if (spawnPoint) {
              hexes.push(buildHex(spawnPoint, type));
         }
        });
      }
    });

    patterns = spawns.map((spawn) => {
      const { type, category } = spawn;
      if (category === "monster") {
        return (
          <HexPattern id={type} category={category} size={{ x: 6.2, y: 5.6 }} />
        );
      } else {
        return (
          <HexPattern
            id={type}
            category={category}
            size={{ x: 6.3, y: 5.41 }}
          />
        );
      }
    });

    patterns.push(
      <HexPattern
        id={"EliteOverlay"}
        category="monster"
        size={{ x: 6.2, y: 5.6 }}
      />
    );
  }

  return { hexes, patterns };
};

export default SpawnLayer;
