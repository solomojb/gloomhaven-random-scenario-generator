import React, { useEffect, useState } from "react";
import MapTile from "../Tabs/Maps/MapTile";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { Tile } from "../../Data";
import HexOverlay from "../Tabs/Maps/HexOverlay";

const Map = () => {
  const { dungeon: {map: {tiles}}
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

  let height = 0;
  heights.forEach( h => height += h);
  return (
    <div className="map" style={{height, width}}>
        <div style={{height, width}}>
          { tiles && tiles.map( (tile: Tile,  index: number) => {
            return <MapTile tile={tile} onTileLoad={(width: number, height:number) => onTileLoad(width, height, index)}/>
          })}
        </div>
        <HexOverlay/>
    </div>
  );
};

export default Map;
