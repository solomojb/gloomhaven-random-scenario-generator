import React, { RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Tile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

export type Dimension = {
  width: number;
  height: number;
}

type Props = {
    tile:Tile;
    onTileLoad?: (width: number, height: number, index:number) => void;
    index: number;
}

const MapTile = (props:Props) =>  {
    const { tile: { tile, rotation, offsetX, offsetY, scale }, onTileLoad, index} = props;
    const game = useGame();
    const [dimension, setDimensions] = useState<Dimension>({width:0, height:0});

      const onLoad = (event:SyntheticEvent<HTMLImageElement, Event>) => {
        const { target } = event;
        //@ts-ignore
        const {width, height} = target.getBoundingClientRect();
          setDimensions({width, height});       
          if (onTileLoad) {
            onTileLoad(width, height, index);
          }
        }

        const translateX = offsetX || 0;
    const translateY = offsetY || 0;

    const { width, height} = dimension;

    let translateXStr = '';
    let translateYStr = '';
    switch (rotation) {
        case 90:
            translateXStr = `translateX(${width}px)`;
            break;
        case 180:
            translateXStr = `translateX(${width}px)`;
            translateYStr = `translateY(${height}px)`;
            break;
        case 270:
            translateYStr = `translateY(${height}px)`;
            break;
    }

    console.log("rendering tile", tile);

    const transform = `${translateYStr} ${translateXStr} rotate(${rotation}deg) scale(${scale})`;
    return (
            <img onLoad={onLoad} src={game.getMapPath(tile)} style={{position:'relative', top:`${translateY}px`, left:`${translateX}px`, transformOrigin: "left top", transform}}/>
            )
};

export default MapTile;