import React from "react";
import { Hexagon, Text } from "../../react-hexgrid";
import { OverlayTile } from "../../Data";
import { getItemViewState } from "../../State/Selectors";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexPattern from "./HexPattern";
import { ShowFlags } from "../../State/ItemViewState";
import { usePlayerCount } from "../Providers/PlayerCountProvider";

const SpawnLayer = () => {
  const { showFlags } = getItemViewState();
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

  if ((showFlags & ShowFlags.Spawns) > 0) {
    spawns.forEach((spawn) => {
      const { type, id, monsterType, category } = spawn;
      const spawnPoint = spawnPoints.find((spawn) => spawn.id === id);
      if (spawnPoint && type) {
        if (category === "monster") {
          const monsterKey = monsterType[playerCount - 2];
          if (monsterKey !== "none") {
            hexes.push(buildHex(spawnPoint, type));
            if (monsterKey === "elite") {
              hexes.push(buildHex(spawnPoint, "EliteOverlay"));
            }
          }
        } else if (category === "treasures") {
          hexes.push(buildHex(spawnPoint, type, treasureCount++));
        } else {
          hexes.push(buildHex(spawnPoint, type));
        }
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
