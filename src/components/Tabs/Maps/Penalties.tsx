import React from "react";
import { Form } from "semantic-ui-react";
import { Helpers } from "../../../helpers";
import { useDungeon } from "./DungeonProvider";
import "./map.css"

const Penalties = () =>  {
    const { dungeon: {penalties} } = useDungeon();

    const getHtml = (penalty:string, index: number) => {
        console.log(penalty);
        const html = Helpers.parseEffectText((index?"<b>Major:</b> " : "<b>Minor: </b>") + penalty);
        return <div dangerouslySetInnerHTML={{__html:html}}/>
    }

    return <Form.Field>
                <label>Penalties:</label>
                {penalties && penalties.map(getHtml)}
            </Form.Field>
}

export default Penalties;