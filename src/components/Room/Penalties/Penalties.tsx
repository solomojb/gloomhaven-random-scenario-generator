import React from "react";
import { Helpers } from "../../../helpers";
import { useScenario } from "../../Providers/ScenarioProvider";
import { useDungeon } from "../../Tabs/Maps/DungeonProvider";
import { PenaltyButtonGroup } from "./PenatliesSelector";


export const Penalties = () =>  {
    const { dungeon: {penaltyData}, roomNumber } = useDungeon();
    const { scenarioData:{penaltyChosen}} = useScenario();

    const getHtml = (entry: any) => {
        const [type, penalty] = entry;
        const html = Helpers.parseEffectText(`<b>${type}</b> ${penalty}`);
        return <div key={`penalty-${type}`} dangerouslySetInnerHTML={{__html:html}}/>
    }

    const penaltiesToShow = Object.entries(penaltyData).map(getHtml);

    if (roomNumber < 0) {
        return <div className="info-label">
                    <label>Penalties:</label>
                    {penaltiesToShow}
                </div>
    }
    const penaltyForRoom = penaltyChosen[roomNumber] || "none";
    const penalty = penaltyData[penaltyForRoom] || "None";

    return <div className="info-label">
            <PenaltyButtonGroup roomNumber={roomNumber}/>
            <label>Penalty:</label>
            {penalty}
        </div>
}
