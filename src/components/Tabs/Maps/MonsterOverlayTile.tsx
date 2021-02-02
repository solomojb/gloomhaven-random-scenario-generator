import React from "react";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    monsterName: string;
    monsterType: string;
    rotateHex: boolean;
}

const MonsterOverlayTile = (props: Props) => {
    const { monsterName, rotateHex, monsterType } = props;
    const game = useGame();
    return (<div className="monster-tile">
                <img className="monster-image" style={{transform: "scale(1.2)"}} src={game.getMonsterImage(monsterName, rotateHex)}/>
                {monsterType === "elite" && <img className="monster-image" style={{transform: "scale(1.2)"}} src={game.getMonsterImage("EliteOverlay", rotateHex)}/>}
            </div>)
}

export default MonsterOverlayTile;