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
  const { dungeon, dungeon: {map: {tiles}}
} = useDungeon();

  const [dims, setDimensions] = useState<Dimension>({width:0, height:0, count:0});

  useEffect(() => {
    setDimensions({width:0, height:0, count:0});
  }, [dungeon])

  const onTileLoad = (width:number, height: number, index: number) => {
    setDimensions( current => { 
        return {height: current.height + height, width: Math.max(current.width, width), count: current.count + 1};
      });
  }

  const { width, height, count} = dims;

  console.log("rendering map");
  const hidden = false;//(count !== tiles.length);

  return (
    <div className="map" style={{height, width, visibility: hidden ? "hidden" : "visible"}}>
        <div style={{height, width}}>
          { tiles && tiles.map( (tile: Tile, index: number) => {
            return <MapTile tile={tile} index={index} onTileLoad={onTileLoad}/>
          })}
        </div>
        <HexOverlay/>
    </div>
  );
};

export default Map;
