import React from "react";
import { MapData, Tile } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    tile:Tile;
}

const MapTile = (props:Props) =>  {
    const { tile: { tile, rotation, scale, offsetX, offsetY } } = props;
    const game = useGame();

    const translateX = offsetX || 0;
    const translateY = -((1 - (scale + .1))*100 + (offsetY || 0));

    const transform = scale != 1 ? `scale(${scale}) translateY(${translateY}%) translateX(${translateX}px)`: '';

    return <div style={{transformOrigin: "center", transform }}>
                <img src={game.getMapPath(tile)} style={{transformOrigin: "center", transform: `rotate(${rotation}deg)`}}/>
        </div>
}

export default MapTile;