import React from "react";
import { MonsterData } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import "./map.css"

type Props = {
}

const MonsterCard = (props:Props) =>  {
    const { monsterData: { name } } = useDungeon();
    const game = useGame();

    return <img className="dungeon-card" src={game.getMonsterCard(name)}/>
}

export default MonsterCard;