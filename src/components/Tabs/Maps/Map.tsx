import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";

type Props = {
    data:MapData;
}

const Map = (props:Props) =>  {
    const { data } = props;
    const game = useGame();

    return <img src={game.getMapPath(data)}/>
}

export default Map;