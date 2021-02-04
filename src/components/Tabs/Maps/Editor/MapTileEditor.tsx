import React, { useEffect, useState } from "react";
import { MapData, Tile } from "../../../../State/MapData";
import Tumblers from "../Tumblers";

type Props = {
    dungeonData: MapData;
};

const MapTileEditor = (props: Props) => {
  const { dungeonData } = props;
  const [mapScale, setMapScale] = useState<number[]>(dungeonData.tiles.map(tile => tile.scale));

  useEffect(() => {
    if (!dungeonData) {
      return;
    }
    const scales = dungeonData.tiles.map(tile => tile.scale);
    setMapScale(scales);
  }, [dungeonData]);


  return (<div>
      {dungeonData.tiles.map((tile: Tile, tileIndex: number) => {
    return <Tumblers
      label={`Map ${tile.tile} Scale:`}
      value={mapScale[tileIndex]}
      step={0.01}
      onChange={(value: number) => {
        const newMap: number[] = Object.assign([], mapScale);
        newMap[tileIndex] = value;
        setMapScale(newMap);
        dungeonData.tiles[tileIndex].scale = value;
      }}
    />
    }
  )}</div>);
};

export default MapTileEditor;
