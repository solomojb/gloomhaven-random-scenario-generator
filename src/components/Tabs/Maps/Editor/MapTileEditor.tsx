import React, { useEffect, useState } from "react";
import { Tile } from "../../../../State/MapData";
import { useDungeon } from "../DungeonProvider";
import Tumblers from "../Tumblers";

type Props = {
};

const MapTileEditor = (props: Props) => {
  const { dungeon, setDungeon } = useDungeon();
  const [tiles, setTiles] = useState<Tile[]>(dungeon.tiles);

  useEffect( () => {
      setTiles(dungeon.tiles);
  }, [dungeon])

  return (<div>
      {tiles.map((tile: Tile, tileIndex: number) => {
            return <Tumblers
            label={`Map ${tile.tile} Scale:`}
            value={tile.scale}
            step={0.01}
            onChange={(value: number) => {
                const newDungeon = Object.assign({}, dungeon);
                newDungeon.tiles[tileIndex].scale = value;
                setDungeon(newDungeon);
            }}
    />
    }
  )}</div>);
};

export default MapTileEditor;
