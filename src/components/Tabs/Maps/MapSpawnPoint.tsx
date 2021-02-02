import React, { ReactNode } from "react";
import { SpawnPoint } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";

type Props = {
  children: ReactNode | ReactNode[]
  row: number;
  column: number;
  offsetX: number;
  offsetY: number;
  overlayTile: string;
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
  return { top: offsetY + 53 * row + columnOffset, left: offsetX + 47 * column + rowOffset};
};

const MapSpawnPoint = (props: Props) => {
  const game = useGame();
  const { overlayTile, children, rotateHex} = props;
  const style = getSpawnPointPos(props);
  return (
    <div className="map-spawn-point" style={style}>
      <img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath(overlayTile)}/>
      {children}
    </div>
  );
};

export default MapSpawnPoint;
