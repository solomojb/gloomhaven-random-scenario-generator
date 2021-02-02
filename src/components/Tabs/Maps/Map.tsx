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
  const { data: { tile, spawnPoints, offsetX, offsetY, rotation, rotateHex, maxRows, maxColumns, scale, obstacles} } = props;
  const {showGrid} = getItemViewState();
  const game = useGame();
  
  const grid = [];
  for (let row = 0; row < maxRows; row += 1) {
    for (let column = 0; column < maxColumns; column += 1) {
      grid.push(<MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
        <img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath("corridors/wood-1")}/>
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
            return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath("corridors/natural-stone-1")}/>
                    <div className="map-spawn-id">{id}</div>
                  </MapSpawnPoint>

        })}
        { obstacles && obstacles.map( obstacle => {
            const { type, row, column, scale = 1, rotation = 0 } = obstacle;
            const modifiedRotation = rotation + (rotateHex ? 90 : 0);
            const transform = `rotate(${modifiedRotation}deg) scale(${scale})`;
            return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <img style={{transformOrigin: "center", transform }}src={game.getOverlayTokenPath(`obstacles/${type}`)}/>
                  </MapSpawnPoint>

        })}        
    </div>
  );
};

export default Map;
