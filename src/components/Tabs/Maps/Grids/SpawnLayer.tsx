import React from "react";
import { Hexagon } from "../../../../react-hexgrid";
import { OverlayTile } from "../../../../Data";
import { getItemViewState } from "../../../../State/Selectors";
import { useDungeon } from "../DungeonProvider";
import HexPattern from "./HexPattern";
import { ShowFlags } from "../../../../State/ItemViewState";

const SpawnLayer = () => {
  const { numberOfPlayers, showFlags } = getItemViewState();
  const {
    dungeon: { spawnPoints },
    monsterData: { spawns },
  } = useDungeon();

  const buildHex = (spawnPoint: OverlayTile, pattern: string) => {
    const { q, r } = spawnPoint;
    return <Hexagon q={q} r={r} s={0} fill={pattern.replace(" ", "-")} />;
  };
  const hexes: JSX.Element[] = [];
  let patterns: JSX.Element[] = [];

  if ((showFlags & ShowFlags.Spawns) > 0) {
    spawns.forEach((spawn) => {
      const { type, id, monsterType, category } = spawn;
      const spawnPoint = spawnPoints.find((spawn) => spawn.id === id);
      if (spawnPoint && type) {
        if (category === "monster") {
          const monsterKey = monsterType[numberOfPlayers];
          if (monsterKey !== "none") {
            hexes.push(buildHex(spawnPoint, type));
            if (monsterKey === "elite") {
              hexes.push(buildHex(spawnPoint, "EliteOverlay"));
            }
          }
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
