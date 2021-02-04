import React from "react";
import { getItemViewState } from "../../../State/Selectors";
import { useGame } from "../../Game/GameProvider";

type Props = {
    tileName:string;
    category: string;
}

const MapOverlayTile = (props: Props) => {
    const { tileName, category } = props;
    const game = useGame();
    const { rotateHex } = getItemViewState();
    
    return (<img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath(tileName, category)}/>);
}

export default MapOverlayTile;