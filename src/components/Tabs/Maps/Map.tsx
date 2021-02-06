import React, { createRef, Ref, useEffect, useState } from "react";
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

  const [heights, setHeights] = useState<number[]>([]);
  const [width, setWidth] = useState<number>(0);

  const onTileLoad = (w:number, h: number, tileIndex: number) => {
    console.log(w,h, tileIndex);
    setHeights( prevHeights => { 
        const newHeights = [...prevHeights];
        newHeights[tileIndex] = h;
        return newHeights;
      });
    setWidth( prevWidth => Math.max(prevWidth, w));
  }

  const { showFlags, numberOfPlayers} = getItemViewState();
  
  const grid = [];
  for (let row = 0; row < maxRows; row += 1) {
    for (let column = 0; column < maxColumns; column += 1) {
      grid.push(<MapSpawnPoint row={row} column={column}>
        <MapOverlayTile category={"corridors"} tileName={"wood-1"}/>
        <div className="map-spawn-id">{`${row},${column}`}</div>
      </MapSpawnPoint>)
    }
  }

  const isFlagOn = (flag: ShowFlags) => {
    return (showFlags & flag) > 0;
  }

  let height = 0;
  heights.forEach( h => height += h);
  return (
    <div className="map" style={{height, width}}>
        <div style={{height, width}}>
          { tiles && tiles.map( (tile: Tile,  index: number) => {
            return <MapTile tile={tile} onTileLoad={(width: number, height:number) => onTileLoad(width, height, index)}/>
          })}
        </div>
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
