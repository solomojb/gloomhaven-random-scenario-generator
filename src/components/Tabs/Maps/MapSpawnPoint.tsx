import React, { ReactNode } from "react";
import { useDungeon } from "./DungeonProvider";

type Props = {
  children: ReactNode | ReactNode[]
  row: number;
  column: number;
};

const getSpawnPointPos = (mapOffsetX:number, mapOffsetY: number, rotateHex: boolean, props: Props) => {
  const {
    row, 
    column,
  } = props;
  const columnOffset = !rotateHex && column % 2 !== 0 ? 52 / 2 : 0;
  const rowOffset = rotateHex && row % 2 !== 0 ? 52 / 2 : 0;
  const paddingX = rotateHex ? 53 : 47;
  const paddingY = rotateHex ? 47 : 53;
  return { top: mapOffsetY + paddingY * row + columnOffset, left: mapOffsetX + paddingX * column + rowOffset};
};

const MapSpawnPoint = (props: Props) => {
  const { children, row, column } = props;
  const { dungeon: {offsetX, offsetY, rotateHex}} = useDungeon();

  const style = getSpawnPointPos(offsetX, offsetY, rotateHex, props);
  return (
    <div key={`spawnpoint-${row}-${column}`} className="map-spawn-point" style={style}>
      {children}
    </div>
  );
};

export default MapSpawnPoint;
