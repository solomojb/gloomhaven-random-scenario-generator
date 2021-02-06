import React from "react";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";

type Props = {
    tileName:string;
    category: string;
}

const MapOverlayTile = (props: Props) => {
    const { tileName, category } = props;
    const { dungeon: {map: {rotateHex}}} = useDungeon();
    const game = useGame();
    
    return (<img className={rotateHex ? "rotated" : ""} src={game.getOverlayTokenPath(tileName, category)}/>)
}

export default MapOverlayTile;