import React from "react";
import { Point, SpawnPoint, Pos } from "../../../State/MapData";

type Props = {
  spawnPoint: SpawnPoint;
  offset: Point;
};

const getSpawnPointPos = (offset: Point, pos: Pos) => {
  console.log(offset);
  const { x, y } = offset;
  const { row, col } = pos;
  const colOffset = col % 2 !== 0 ? 52/2:  0;
  return { top: y + 53 * row + colOffset, left: x + 47 * col };
};

const MapSpawnPoint = (props: Props) => {
  const {
    spawnPoint: { pos, id },
    offset,
  } = props;
  return (
    <div className="hexagon" style={getSpawnPointPos(offset, pos)}>
        <div style={{ textAlign: "center" }}>{id}</div>
    </div>
  );
};

export default MapSpawnPoint;
