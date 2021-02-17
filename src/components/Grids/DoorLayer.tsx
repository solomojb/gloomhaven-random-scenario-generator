import React, { ReactNode } from "react";
import { Hexagon, Pattern } from "../../react-hexgrid";
import { useGame } from "../Game/GameProvider";
import { Door } from "../../Data/Door";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";


const DoorLayer = () => {
  const { dungeon: { map : {rotateHex }, entrances, exits }} = useDungeon();
  const game = useGame();
  const { isFlagSet } = useFlags();


  const buildHex = (tile: Door, type: string) => {
    const { q, r, aOrB } = tile;
    const fill = type + aOrB;
    return (
      <Hexagon q={q} r={r} s={0} fill={fill} />
    );
  };

  const buildHexesAndPatterns = (tiles: Door[], type: string) => {
    const hexes = tiles.map((tile) => {
      return buildHex(tile, type);
    });
    
    const xOffset = rotateHex?-0.125:-0.05;
    const yOffset = rotateHex?-0.05:-0.11;
    const size = { x: 6.8, y: 6.8 };

    const patterns = [
      <Pattern
        id={type + "A"}
        link={game.getDoorImage(type, "A", rotateHex)}
        size={size}
        patternXOffset={xOffset}
        patternYOffset={yOffset}
      />,
      <Pattern
        id={type + "B"}
        link={game.getDoorImage(type, "B", rotateHex)}
        size={size}
        patternXOffset={xOffset}
        patternYOffset={yOffset}
      />
    ]

    return { hexes, patterns};
  }

  let hexes: (ReactNode | ReactNode[])[] = [];
  let patterns: (ReactNode | ReactNode[])[] = [];

  if (isFlagSet(ShowFlags.Doors)) {
    const entranceData = buildHexesAndPatterns(entrances, "Entrance");
    const exitData = buildHexesAndPatterns(exits, "Exit");
    hexes = [...entranceData.hexes, ...exitData.hexes];
    patterns = [...entranceData.patterns, ...exitData.patterns];
  }

  return {hexes, patterns};
};

export default DoorLayer;
