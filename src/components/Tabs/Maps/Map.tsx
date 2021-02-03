import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";
import MapSpawnPoint from "./MapSpawnPoint";
import "./map.css"
import { getItemViewState } from "../../../State/Selectors";
import MapTile from "./MapTile";
import MapOverlayTileLayer from "./MapOverlayTileLayer";
import { MonsterData } from "../../../State/MonsterData";
import MapOverlayTile from "./MapOverlayTile";
import MonsterOverlayTile from "./MonsterOverlayTile";

type Props = {
  dungeonData: MapData;
  monsterData: MonsterData;
};

//TODO: move rotate hex into some sort of state.

const Map = (props: Props) => {
  const { dungeonData: { tiles, spawnPoints, offsetX, offsetY, rotateHex, maxRows, maxColumns, obstacles, corridors}, monsterData: {spawns} } = props;
  const {showGrid, numberOfPlayers} = getItemViewState();
  const game = useGame();
  
  const grid = [];
  for (let row = 0; row < maxRows; row += 1) {
    for (let column = 0; column < maxColumns; column += 1) {
      grid.push(<MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
        <MapOverlayTile rotateHex={rotateHex} category={"corridors"} tileName={"wood-1"}/>;
        <div className="map-spawn-id">{`${row},${column}`}</div>
      </MapSpawnPoint>)
    }
  }

  return (
    <div className="map">
        { tiles && tiles.map( tile => {
          return <MapTile tile={tile}/>
        })}
        { showGrid && grid }
        <MapOverlayTileLayer overlayType="corridors" tiles={corridors} offsetX={offsetX} offsetY={offsetY} rotateHex={rotateHex}/>
        { showGrid && spawnPoints.map( spawnPoint => {
            const { id, row, column } = spawnPoint;
            return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <MapOverlayTile rotateHex={rotateHex} category={"corridors"} tileName={"natural-stone-1"}/>
                    <div className="map-spawn-id">{id}</div>
                  </MapSpawnPoint>

        })}
        <MapOverlayTileLayer overlayType="obstacles" tiles={obstacles} offsetX={offsetX} offsetY={offsetY} rotateHex={rotateHex}/>

        {spawns.map( spawn => {
            const { type, id, monsterType, category } = spawn;
            const spawnPoint = spawnPoints.find( spawn => spawn.id === id);
            if (spawnPoint && type) {
              const { row, column } = spawnPoint;
              const image = category === "monster" ? 
                <MonsterOverlayTile rotateHex={rotateHex} monsterName={type} monsterType={monsterType[numberOfPlayers]}/> :
                <MapOverlayTile rotateHex={rotateHex} category={category} tileName={type}/>
              return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                      {image}
                    </MapSpawnPoint>
            }
        })}
    </div>
  );
};

export default Map;
