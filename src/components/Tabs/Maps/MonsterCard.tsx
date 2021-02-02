import React from "react";
import { MonsterData } from "../../../State/MonsterData";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    data:MonsterData;
}

const MonsterCard = (props:Props) =>  {
    const { data: { name } } = props;
    const game = useGame();

    return <img className="dungeon-card" src={game.getMonsterCard(name)}/>
}

export default MonsterCard;