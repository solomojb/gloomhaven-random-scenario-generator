import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[]
  row: number;
  column: number;
  offsetX: number;
  offsetY: number;
  rotateHex: boolean;
};

const getSpawnPointPos = (props: Props) => {
  const {
    offsetX,
    offsetY,
    row, 
    column,
    rotateHex,
  } = props;
  const columnOffset = !rotateHex && column % 2 !== 0 ? 52 / 2 : 0;
  const rowOffset = rotateHex && row % 2 !== 0 ? 52 / 2 : 0;
  const paddingX = rotateHex ? 53 : 47;
  const paddingY = rotateHex ? 47 : 53;
  return { top: offsetY + paddingY * row + columnOffset, left: offsetX + paddingX * column + rowOffset};
};

const MapSpawnPoint = (props: Props) => {
  const { children } = props;
  const style = getSpawnPointPos(props);
  return (
    <div className="map-spawn-point" style={style}>
      {children}
    </div>
  );
};

export default MapSpawnPoint;
