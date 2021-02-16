import React from "react";
import { Form } from "semantic-ui-react";
import { Helpers } from "../../../helpers";
import { useDungeon } from "./DungeonProvider";
import "./map.css"

const Traps = () =>  {
    const { monsterData: {traps} } = useDungeon();

    const getHtml = (trap:string) => {
        const html = Helpers.parseEffectText(trap);
        return <div dangerouslySetInnerHTML={{__html:html}}/>
    }

    if (!traps) {
        return null;
    }

    return <Form.Field>
                <label>Traps:</label>
                {traps.map(getHtml)}
            </Form.Field>
}

export default Traps;