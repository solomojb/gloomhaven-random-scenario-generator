import React, { ReactNode } from "react";
import { GridTile } from "./GridTile";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";

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
    return <GridTile q={q} r={r} category={overlayType} id={fillName} hexType={hexType} rotation={rotation}/>
  };

  let hexes: (ReactNode | ReactNode[])[] = [];
  return (isFlagSet(flag) && tiles) ? tiles.map(buildHex) : hexes;
};

export default OverlayTileLayer;
