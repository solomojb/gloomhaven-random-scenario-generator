import React, { ReactNode } from "react";
import { useDungeon } from "./DungeonProvider";
import { Map } from "../../../Data"

type Props = {
  children: ReactNode | ReactNode[]
  row: number;
  column: number;
};

const getSpawnPointPos = (map: Map, props: Props) => {
  const {offsetX, offsetY, rotateHex} = map;
  const {
    row, 
    column,
  } = props;
  const columnOffset = !rotateHex && column % 2 !== 0 ? 52 / 2 : 0;
  const rowOffset = rotateHex && row % 2 !== 0 ? 52 / 2 : 0;
  const paddingX = rotateHex ? 53 : 47;
  const paddingY = rotateHex ? 47 : 53;
  return { top: offsetY + paddingY * row + columnOffset, left: offsetX + paddingX * column + rowOffset};
};

const MapSpawnPoint = (props: Props) => {
  const { children, row, column } = props;
  const { dungeon: {map}} = useDungeon();

  const style = getSpawnPointPos(map, props);
  return (
    <div key={`spawnpoint-${row}-${column}`} className="map-spawn-point" style={style}>
      {children}
    </div>
  );
};

export default MapSpawnPoint;
