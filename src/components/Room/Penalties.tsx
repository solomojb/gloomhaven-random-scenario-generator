import React from "react";
import { Form } from "semantic-ui-react";
import { Helpers } from "../../helpers";
import { useScenario } from "../Providers/ScenarioProvider";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";

const Penalties = () =>  {
    const { dungeon: {penalties}, roomNumber } = useDungeon();
    const { penalties: pentalitesChosen} = useScenario();

    const getHtml = (index: number) => {
        const penalty = penalties[index];
        const html = Helpers.parseEffectText((index?"<b>Major:</b> " : "<b>Minor: </b>") + penalty);
        return <div dangerouslySetInnerHTML={{__html:html}}/>
    }

    const penaltyChosen = pentalitesChosen[roomNumber];
    const penaltiesToShow = [];

    if (penaltyChosen === "minor" || !penaltyChosen) {
        penaltiesToShow.push(getHtml(0));
    }

    if (penaltyChosen === "major" || !penaltyChosen) {
        penaltiesToShow.push(getHtml(1));
    }

    return <Form.Field>
                <label>Penalties:</label>
                {penaltiesToShow.length ? penaltiesToShow : "None"}
            </Form.Field>
}

export default Penalties;