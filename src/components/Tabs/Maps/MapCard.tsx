import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    data:MapData;
}

const MapCard = (props:Props) =>  {
    const { data: { name } } = props;
    const game = useGame();

    return <img className="dungeon-card" src={game.getMapCard(name)}/>
}

export default MapCard;