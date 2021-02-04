import React from "react";
import { getItemViewState } from "../../../State/Selectors";
import { useGame } from "../../Game/GameProvider";
import "./map.css"

type Props = {
    monsterName: string;
    monsterType?: string;
    className?: string;
}

const MonsterOverlayTile = (props: Props) => {
    const { monsterName, monsterType, className="monster-image" } = props;
    const game = useGame();
    const { rotateHex } = getItemViewState();

    return (<div className="monster-tile">
                {monsterType !== "none" && <img className={className} style={{transform: "scale(1.2)"}} src={game.getMonsterImage(monsterName, rotateHex)}/>}
                {monsterType === "elite" && <img className={className} style={{transform: "scale(1.2)"}} src={game.getMonsterImage("EliteOverlay", rotateHex)}/>}
            </div>)
}

export default MonsterOverlayTile;