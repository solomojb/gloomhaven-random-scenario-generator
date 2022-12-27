import { stringify } from "querystring";
import React from "react";
import { Helpers } from "../../../helpers";
import { useScenario } from "../../Providers/ScenarioProvider";
import { useDungeon } from "../../Tabs/Maps/DungeonProvider";
import { PenaltyButtonGroup } from "./PenatliesSelector";


export const Penalties = () =>  {
    const { dungeon: {penaltyData}, roomNumber } = useDungeon();
    console.log(penaltyData);
    const { scenarioData:{penalties}} = useScenario();

    const getHtml = (entry: any) => {
        const [type, penalty] = entry;
        const html = Helpers.parseEffectText(`<b>${type}</b> ${penalty}`);
        return <div key={`penalty-${type}`} dangerouslySetInnerHTML={{__html:html}}/>
    }

    const penaltiesToShow = Object.entries(penaltyData).map(getHtml);

    // const penaltyChosen = pentalitesChosen[roomNumber];
    // const penaltiesToShow = [];

    // if (penaltyChosen === "minor" || roomNumber < 0) {
    //     penaltiesToShow.push(getHtml(0));
    // }

    // if (penaltyChosen === "major" || roomNumber < 0) {
    //     penaltiesToShow.push(getHtml(1));
    // }

    if (roomNumber < 0) {
        return <div className="info-label">
                    <label>Penalties:</label>
                    {penaltiesToShow}
                </div>
    }
    const penalty = penaltyData[penalties[roomNumber]] || "None";

    return <div className="info-label">
            <PenaltyButtonGroup roomNumber={roomNumber}/>
            <label>Penalty:</label>
            {penalty}
        </div>
}
