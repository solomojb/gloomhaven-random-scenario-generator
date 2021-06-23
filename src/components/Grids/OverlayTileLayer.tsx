import React, { ReactNode } from "react";
import { Hexagon } from "../../react-hexgrid";
import HexPattern from "./HexPattern";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";

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
    const fillName = pattern.replace(" " , "-");
    return (
      <Hexagon key={`OverlayTileLayer-${q}-${r}-${fillName}`} q={q} r={r} s={0} fill={fillName} hexType={hexType || "1x1Hex"} rotation={rotation}/>
    );
  };

  let hexes: (ReactNode | ReactNode[])[] = [];
  let patterns: (ReactNode | ReactNode[])[] = [];

  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  if (isFlagSet(flag) && tiles) {
    hexes = tiles.map(buildHex);
    patterns = tiles.filter(onlyUnique).map((tile) => {
      const { hexType, pattern, q, r }  = tile;
      return (
        <HexPattern
          key={`OverlayTileLayer-${q}-${r}-${pattern}-patttern`}
          id={pattern}
          category={overlayType}
          hexType={hexType}
        />
      );
    });
  }

  return {hexes, patterns};
};

export default OverlayTileLayer;
