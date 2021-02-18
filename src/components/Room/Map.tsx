import React, { useEffect, useState } from "react";
import MapTile from "../Tabs/Maps/MapTile";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { Tile } from "../../Data";
import HexOverlay from "../Tabs/Maps/HexOverlay";

export type Dimension = {
  width: number;
  height: number;
  count: number;
}

const Map = () => {
  const { dungeon: {map: {tiles}}
} = useDungeon();

  const [dims, setDimensions] = useState<Dimension>({width:0, height:0, count:0});

  useEffect(() => {
    setDimensions({width:0, height:0, count:0});
  }, [tiles])

  const onTileLoad = (width:number, height: number) => {
    setDimensions( current => { 
        return {height: current.height + height, width: Math.max(current.width, width), count: current.count + 1};
      });
  }

  const { width, height, count} = dims;

  console.log("rendering map");

  return (
    <div className="map" style={{height, width, visibility:(count !== tiles.length) ? "hidden" : "visible"}}>
        <div style={{height, width}}>
          { tiles && tiles.map( (tile: Tile) => {
            return <MapTile tile={tile} onTileLoad={(width: number, height:number) => onTileLoad(width, height)}/>
          })}
        </div>
        <HexOverlay/>
    </div>
  );
};

export default Map;
