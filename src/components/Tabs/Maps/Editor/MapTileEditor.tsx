import React from "react";
import { Tile } from "../../../../Data";
import { useDungeon } from "../DungeonProvider";
import Tumblers from "../Tumblers";

const MapTileEditor = () => {
  const { dungeon, dungeon: { map: { tiles } }, setDungeon } = useDungeon();

return (<div>
      {tiles.map((tile: Tile, tileIndex: number) => {
            return <Tumblers
            label={`Map ${tile.tile} Scale:`}
            value={tile.scale}
            step={0.01}
            onChange={(value: number) => {
                const newTiles = [...tiles];
                newTiles[tileIndex].scale = value;
                setDungeon({...dungeon, map: {...dungeon.map, tiles: newTiles}});
            }}
    />
    }
  )}</div>);
};

export default MapTileEditor;
