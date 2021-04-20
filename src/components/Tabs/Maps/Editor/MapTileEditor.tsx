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

  const handleKey = (e:any, tileIndex: number) => {
    e.preventDefault();
    const newTiles = [...tiles];
    const tile = newTiles[tileIndex];
    switch (e.key) {
      case "ArrowUp":
        tile.offsetY -= 1;
      break;
      case "ArrowDown":
        tile.offsetY += 1;
      break;
      case "ArrowLeft":
        tile.offsetX -= 1;
        break;
      case "ArrowRight":
        tile.offsetX += 1;
      break;
      case "+":
        tile.scale += 0.01;
        break;
      case "-":
        tile.scale -= 0.01;
        break;
      }
      setDungeon({
        ...dungeon,
        map: { ...dungeon.map, tiles: newTiles },
      });
  }

  return (
    <Form.Field>
      {tiles.map((tile: Tile, tileIndex: number) => {
        return (
          <Form.Field>
            <div onKeyDown={(e) => handleKey(e, tileIndex)} tabIndex={0}>
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
          </div>
          </Form.Field>
        );
      })}
    </Form.Field>
  );
};

export default MapTileEditor;
