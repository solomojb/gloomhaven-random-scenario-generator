import React from "react";
import MapSpawnPoint from "./MapSpawnPoint";
import "./map.css"
import { getItemViewState } from "../../../State/Selectors";
import MapTile from "./MapTile";
import MapOverlayTileLayer from "./MapOverlayTileLayer";
import MapOverlayTile from "./MapOverlayTile";
import MonsterOverlayTile from "./MonsterOverlayTile";
import { ShowFlags } from "../../../State/ItemViewState";
import { useDungeon } from "./DungeonProvider";
import { MonsterData, Tile } from "../../../Data";

type Props = {
  monsterData: MonsterData;
};

const Map = (props: Props) => {
  const { dungeon: {map: {tiles}, spawnPoints, maxRows, maxColumns, obstacles, corridors } } = useDungeon();
  const { monsterData: {spawns} } = props;

  const { showFlags, numberOfPlayers} = getItemViewState();
  
  const grid = [];
  for (let row = 0; row < maxRows; row += 1) {
    for (let column = 0; column < maxColumns; column += 1) {
      grid.push(<MapSpawnPoint row={row} column={column}>
        <MapOverlayTile category={"corridors"} tileName={"wood-1"}/>;
        <div className="map-spawn-id">{`${row},${column}`}</div>
      </MapSpawnPoint>)
    }
  }

  const isFlagOn = (flag: ShowFlags) => {
    return (showFlags & flag) > 0;
  }

  return (
    <div className="map">
        { tiles && tiles.map( (tile: Tile) => {
          return <MapTile tile={tile}/>
        })}
        { isFlagOn(ShowFlags.Grid) && grid }
        { isFlagOn(ShowFlags.Corridors) && <MapOverlayTileLayer overlayType="corridors" tiles={corridors}/>}
        { isFlagOn(ShowFlags.SpawnPoint) && spawnPoints.map( spawnPoint => {
            const { id, row, column } = spawnPoint;
            return <MapSpawnPoint row={row} column={column}>
                    <MapOverlayTile category={"corridors"} tileName={"natural-stone-1"}/>
                    <div className="map-spawn-id">{id}</div>
                  </MapSpawnPoint>

        })}
        {isFlagOn(ShowFlags.Obstacles) && <MapOverlayTileLayer overlayType="obstacles" tiles={obstacles}/>}

        {isFlagOn(ShowFlags.Spawns) && spawns.map( spawn => {
            const { type, id, monsterType, category } = spawn;
            const spawnPoint = spawnPoints.find( spawn => spawn.id === id);
            if (spawnPoint && type) {
              const { row, column } = spawnPoint;
              const image = category === "monster" ? 
                <MonsterOverlayTile monsterName={type} monsterType={monsterType[numberOfPlayers]}/> :
                <MapOverlayTile category={category} tileName={type}/>
              return <MapSpawnPoint row={row} column={column}>
                      {image}
                    </MapSpawnPoint>
            }
        })}
    </div>
  );
};

export default Map;
