import React from "react";
import { useGame } from "../../Game/GameProvider";

type Props = {
    tileName:string;
    rotateHex: boolean;
    category: string;
}

const MapOverlayTile = (props: Props) => {
    const { tileName, rotateHex, category } = props;
    const game = useGame();
    return (<img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath(tileName, category)}/>);
}

export default MapOverlayTile;