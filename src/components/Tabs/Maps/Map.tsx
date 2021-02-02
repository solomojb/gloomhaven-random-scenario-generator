import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";
import MapSpawnPoint from "./MapSpawnPoint";
import "./map.css"
import { getItemViewState } from "../../../State/Selectors";
import MapTile from "./MapTile";

type Props = {
  data: MapData;
};

const Map = (props: Props) => {
  const { data: { tiles, spawnPoints, offsetX, offsetY, rotateHex, maxRows, maxColumns, obstacles, corridors} } = props;
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
  console.log(tiles);

  return (
    <div className="map">
        { tiles && tiles.map( tile => {
          return <MapTile tile={tile}/>
        })}
        { showGrid && grid }
        { corridors && corridors.map( corridor => {
            const { type, row, column, scale = 1, rotation = 0 } = corridor;
            const modifiedRotation = rotation + (rotateHex ? 90 : 0);
            const rotationStyle = modifiedRotation ? `rotate(${modifiedRotation}deg)`: '';
            const scaleStyle = scale != 1 ? `scale(${scale})` : ''; 
            const transform = rotationStyle + ' ' + scaleStyle;
            console.log(type, transform)
            return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <img style={{transformOrigin: "center", transform }}src={game.getOverlayTokenPath(`corridors/${type}`)}/>
                  </MapSpawnPoint>

        })}           
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
            const rotationStyle = modifiedRotation ? `rotate(${modifiedRotation}deg)`: '';
            const scaleStyle = scale != 1 ? `scale(${scale})` : ''; 
            const transform = rotationStyle + ' ' + scaleStyle;
            console.log(type, transform)
            return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <img style={{transformOrigin: "center", transform }}src={game.getOverlayTokenPath(`obstacles/${type}`)}/>
                  </MapSpawnPoint>

        })}        
    </div>
  );
};

export default Map;
