import React, { ReactNode } from "react";
import { Hexagon } from "../../react-hexgrid";
import { OverlayTile } from "../../Data";
import HexPattern from "./HexPattern";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { off } from "process";

type Props = {
  tiles: OverlayTile[];
  overlayType: string;
  flag: ShowFlags;
};

const OverlayTileLayer = (props: Props) => {
  const { tiles, overlayType, flag } = props;
  const { isFlagSet } = useFlags();

  const buildHex = (tile: OverlayTile) => {
    const { q, r, pattern, rotation, hexType } = tile;
    const fillName = pattern.replace(" " , "-") + (rotation ? rotation : "");
    return (
      <Hexagon q={q} r={r} s={0} fill={fillName} hexType={hexType || "1x1Hex"} />
    );
  };

  let hexes: (ReactNode | ReactNode[])[] = [];
  let patterns: (ReactNode | ReactNode[])[] = [];

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  if (isFlagSet(flag) && tiles) {
    hexes = tiles.map(buildHex);

    const patternStrings = tiles
    .map((tile) => {
        const { offset, scale }  = tile;
        return {
          pattern: tile.pattern,
          rotation: tile.rotation,
          scale: scale || {x:1, y:1},
          offset
        };
      })
      .filter(onlyUnique);
    patterns = patternStrings.map((tile) => {
      const { rotation, scale, offset }  = tile;
      return (
        <HexPattern
          id={tile.pattern}
          category={overlayType}
          rotation={rotation}
          scale={scale}
          offset={offset}
          size={{ x: 6.3 * scale.x, y: 5.41 * scale.y }}
        />
      );
    });
  }

  return {hexes, patterns};
};

export default OverlayTileLayer;
