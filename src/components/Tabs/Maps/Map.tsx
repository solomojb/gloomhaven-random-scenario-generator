import React, { useEffect, useState } from "react";
import "./map.css"
import { getItemViewState } from "../../../State/Selectors";
import MapTile from "./MapTile";
import MapOverlayTileLayer from "./MapOverlayTileLayer";
import { ShowFlags } from "../../../State/ItemViewState";
import { useDungeon } from "./DungeonProvider";
import { Tile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import MapGrid from "./MapGrid";
import DungeonGrid from "./DungonGrid";
import MapSpawnPointsLayer from "./MapSpawnPointsLayer";
import MonsterTileLayer from "./MonsterTileLayer";

const Map = () => {
  const game = useGame();
  const { dungeon: {map: {tiles}, obstacles, corridors }
} = useDungeon();

  const [heights, setHeights] = useState<number[]>([]);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setHeights([]);
    setWidth(0);
  }, [tiles])

  const onTileLoad = (w:number, h: number, tileIndex: number) => {
    setHeights( prevHeights => { 
        const newHeights = [...prevHeights];
        newHeights[tileIndex] = h;
        return newHeights;
      });
    setWidth( prevWidth => Math.max(prevWidth, w));
  }

  const { showFlags } = getItemViewState();
  
  // const grid = [];
  // for (let row = 0; row < maxRows; row += 1) {
  //   for (let column = 0; column < maxColumns; column += 1) {
  //     grid.push(<MapSpawnPoint row={row} column={column}>
  //       <MapOverlayTile category={"corridors"} tileName={"wood-1"}/>
  //       <div className="map-spawn-id">{`${row},${column}`}</div>
  //     </MapSpawnPoint>)
  //   }
  // }

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
        { isFlagOn(ShowFlags.AllGrid) && (<DungeonGrid/>) }
        { isFlagOn(ShowFlags.Grid) && (<MapGrid/>) }
        { isFlagOn(ShowFlags.Corridors) && <MapOverlayTileLayer overlayType="corridors" tiles={corridors}/>}
        { isFlagOn(ShowFlags.SpawnPoint) && <MapSpawnPointsLayer/>}
        {isFlagOn(ShowFlags.Obstacles) && <MapOverlayTileLayer overlayType="obstacles" tiles={obstacles}/>}
        {isFlagOn(ShowFlags.Spawns) && <MonsterTileLayer/>}
    </div>
  );
};

export default Map;
