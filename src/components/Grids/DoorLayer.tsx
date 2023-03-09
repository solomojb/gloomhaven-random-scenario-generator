import React from "react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { useScenario } from "../Providers/ScenarioProvider";
import { GridTile } from "./GridTile";


const DoorLayer = () => {
  const { dungeon: {entrances, exits }, roomNumber} = useDungeon();
  const { getNextRoom, gotoPreviousRoom, isDoorShown } = useScenario();
  const { isFlagSet } = useFlags();


  const buildHex = (tile: Door, type: string) => {
    const { q, r, aOrB } = tile;
    if (!isDoorShown(aOrB, roomNumber, type)) {
      return null;
    }
    const fill = type + aOrB;

    const onDoorClick = () => {
        type === "Exit" && getNextRoom(aOrB, roomNumber);
        type === "Entrance" && gotoPreviousRoom(roomNumber);
    }

    return <GridTile q={q} r={r} id={fill} category="doors" onClick={onDoorClick}></GridTile>
  };

  const buildHexes = (tiles: Door[], type: string) => {
    return tiles.map((tile) => {
      return buildHex(tile, type);
    });
  }

 if (isFlagSet(ShowFlags.Doors)) {
    const entranceData = buildHexes(entrances, "Entrance");
    const exitData = buildHexes(exits, "Exit");
    return [...entranceData, ...exitData];
  }
  return undefined;
};

export default DoorLayer;
