import React, { useEffect, useRef, useState } from "react";
import { Tile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    tile:Tile;
    onTileLoad?: (width: number, height: number) => void;
}

const MapTile = (props:Props) =>  {
    const { tile: { tile, rotation, offsetX, offsetY, scale }, onTileLoad} = props;
    const game = useGame();
    const ref = useRef<HTMLImageElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

      const onLoad = (ref:any) => {
          const {width, height} = ref.current.getBoundingClientRect();
        setHeight( height );
        setWidth( width );
        if (onTileLoad) {
            console.log(width, height);
            onTileLoad(width, height);
        }
    }

  useEffect( () => {
      //@ts-ignore
      if (ref && ref.current) {
        //@ts-ignore
        ref.current.addEventListener('load', () => onLoad(ref));
        //@ts-ignore
        if (ref.current.complete) {
          onLoad(ref);
        }
      }
  },[ref.current]);

    const translateX = offsetX || 0;
    const translateY = offsetY || 0;

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

    const transform = `${translateYStr} ${translateXStr} rotate(${rotation}deg) scale(${scale})`;
    // const transform = `rotate(270deg)`;//scale != 1 ? `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}%) scale(${scale}) `: '';

    return (
            <img ref={ref} src={game.getMapPath(tile)} style={{position:'relative', top:`${translateY}px`, left:`${translateX}px`, transformOrigin: "left top", transform}}/>
            )
};

export default MapTile;