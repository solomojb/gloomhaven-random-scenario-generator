import React, { ReactNode } from "react";
import { Hexagon } from "../../../../react-hexgrid";
import { OverlayTile } from "../../../../Data";
import HexPattern from "./HexPattern";
import { ShowFlags } from "../../../../State/ItemViewState";
import { getItemViewState } from "../../../../State/Selectors";

type Props = {
  tiles: OverlayTile[];
  overlayType: string;
  flag: ShowFlags;
};

const OverlayTileLayer = (props: Props) => {
  const { tiles, overlayType, flag } = props;
  const { showFlags } = getItemViewState();

  const buildHex = (tile: OverlayTile) => {
    const { q, r, pattern, rotation, hexType } = tile;
    const fillName = pattern + (rotation ? rotation : "");
    return (
      <Hexagon q={q} r={r} s={0} fill={fillName} hexType={hexType || "1x1Hex"} />
    );
  };

  let hexes: (ReactNode | ReactNode[])[] = [];
  let patterns: (ReactNode | ReactNode[])[] = [];

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  if ((showFlags & flag) > 0 && tiles) {
    hexes = tiles.map((tile) => {
      const hexes = [];
      hexes.push(buildHex(tile));
      return hexes;
    });


    const patternStrings = tiles
      .map((tile) => {
        return {
          pattern: tile.pattern,
          rotation: tile.rotation,
          scale: tile.scale || 1,
          offset: { x: tile.x, y: tile.y },
        };
      })
      .filter(onlyUnique);
    patterns = patternStrings.map((tile) => {
      return (
        <HexPattern
          id={tile.pattern}
          category={overlayType}
          rotation={tile.rotation}
          scale={tile.scale}
          offset={tile.offset}
          size={{ x: 6.3, y: 5.41 * tile.scale }}
        />
      );
    });
  }

  return {hexes, patterns};
};

export default OverlayTileLayer;
