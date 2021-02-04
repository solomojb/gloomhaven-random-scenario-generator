import React from "react";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import "./map.css"

const MapCard = () =>  {
    const { dungeon: { map: {name} } } = useDungeon();
    const game = useGame();

    return <img className="dungeon-card" src={game.getMapCard(name)}/>
}

export default MapCard;