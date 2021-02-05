import React from "react";
import { Form } from "semantic-ui-react";
import { Tile } from "../../../../Data";
import { useDungeon } from "../DungeonProvider";
import Tumblers from "../Tumblers";
import OffsetTumblers from "./OffsetTumblers";

const MapTileEditor = () => {
  const {
    dungeon,
    dungeon: {
      map: { tiles },
    },
    setDungeon,
  } = useDungeon();

  return (
    <Form.Group>
      {tiles.map((tile: Tile, tileIndex: number) => {
        return (
          <Form.Field>
            <label>{tile.tile}</label>
            <Tumblers
              label={`Scale:`}
              value={tile.scale}
              step={0.01}
              onChange={(value: number) => {
                const newTiles = [...tiles];
                newTiles[tileIndex].scale = value;
                setDungeon({
                  ...dungeon,
                  map: { ...dungeon.map, tiles: newTiles },
                });
              }}
            />
            <OffsetTumblers
              onChanged={(offsetX: number, offsetY: number) => {
                const newTiles = [...tiles];
                newTiles[tileIndex].offsetX = offsetX;
                newTiles[tileIndex].offsetY = offsetY;
                setDungeon({
                  ...dungeon,
                  map: { ...dungeon.map, tiles: newTiles },
                });
              }}
              initialX={tile.offsetX || 0}
              initialY={tile.offsetY || 0}
              label=""
            />
          </Form.Field>
        );
      })}
    </Form.Group>
  );
};

export default MapTileEditor;
