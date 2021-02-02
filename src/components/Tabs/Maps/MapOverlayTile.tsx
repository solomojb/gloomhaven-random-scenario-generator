import React from "react";
import { useGame } from "../../Game/GameProvider";

type Props = {
    tileName:string;
    rotateHex: boolean;
}

const MapOverlayTile = (props: Props) => {
    const { tileName, rotateHex } = props;
    const game = useGame();
    return (<img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath(tileName)}/>);
}

export default MapOverlayTile;