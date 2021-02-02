import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";
import MapSpawnPoint from "./MapSpawnPoint";
import "./map.css"
import { getItemViewState } from "../../../State/Selectors";

type Props = {
  data: MapData;
};

const Map = (props: Props) => {
  const { data: { tile, spawnPoints, offsetX, offsetY, rotation, rotateHex, maxRows, maxColumns, scale} } = props;
  const {showGrid} = getItemViewState();
  const game = useGame();
  
  const grid = [];
  for (let row = 0; row < maxRows; row += 1) {
    for (let column = 0; column < maxColumns; column += 1) {
      grid.push(<MapSpawnPoint rotateHex={rotateHex} overlayTile={"corridors/wood-1"} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
        <div className="map-spawn-id">{`${row},${column}`}</div>
      </MapSpawnPoint>)
    }
  }

  return (
    <div className="map">
        <img src={game.getMapPath(tile)} style={{transformOrigin: "center", transform: `rotate(${rotation}deg) scale(${scale})`}}/>
        { showGrid && grid }
        { spawnPoints.map( spawnPoint => {
            const { id, row, column } = spawnPoint;
            return <MapSpawnPoint rotateHex={rotateHex} overlayTile={"corridors/natural-stone-1"} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <div className="map-spawn-id">{id}</div>
                  </MapSpawnPoint>

        })}
    </div>
  );
};

export default Map;
