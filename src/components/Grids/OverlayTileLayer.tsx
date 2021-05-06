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
  const { dungeon: {map: {rotateHex}}} = useDungeon();
  const { isFlagSet } = useFlags();

  const buildHex = (tile: OverlayTile) => {
    const { q, r, pattern, rotation, hexType } = tile;
    const fillName = pattern.replace(" " , "-");
    return (
      <Hexagon q={q} r={r} s={0} fill={fillName} hexType={hexType || "1x1Hex"} rotation={rotation}/>
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
      const { hexType, pattern }  = tile;
      return (
        <HexPattern
          id={pattern}
          category={overlayType}
          rotate={rotateHex}
          hexType={hexType}
        />
      );
    });
  }

  return {hexes, patterns};
};

export default OverlayTileLayer;
