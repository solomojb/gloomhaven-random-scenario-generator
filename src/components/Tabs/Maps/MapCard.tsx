import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";

type Props = {
    data:MapData;
}

const MapCard = (props:Props) =>  {
    const { data: { name } } = props;
    const game = useGame();

    return <img src={game.getMapCard(name)}/>
}

export default MapCard;