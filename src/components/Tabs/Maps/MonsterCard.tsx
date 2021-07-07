import React from "react";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import "./map.css"

const MonsterCard = () =>  {
    const { monsterData: { name } } = useDungeon();
    const game = useGame();
    
    if (!name.length) {
        return null;
    }

    return <img className="dungeon-card" src={game.getMonsterCard(name)}/>
}

export default MonsterCard;