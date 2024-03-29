import React from "react";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import "./map.css"

const MapCard = () =>  {
    const { dungeon: {name} } = useDungeon();
    const game = useGame();

    if (!name.length) {
        return null;
    }

    return <img className="dungeon-card" src={game.getMapCard(name)}/>
}

export default MapCard;