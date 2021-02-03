import React from "react";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    monsterName: string;
    monsterType?: string;
    rotateHex?: boolean;
    className?: string;
}

const MonsterOverlayTile = (props: Props) => {
    const { monsterName, rotateHex = false, monsterType, className="monster-image" } = props;
    const game = useGame();
    return (<div className="monster-tile">
                {monsterType !== "none" && <img className={className} style={{transform: "scale(1.2)"}} src={game.getMonsterImage(monsterName, rotateHex)}/>}
                {monsterType === "elite" && <img className={className} style={{transform: "scale(1.2)"}} src={game.getMonsterImage("EliteOverlay", rotateHex)}/>}
            </div>)
}

export default MonsterOverlayTile;