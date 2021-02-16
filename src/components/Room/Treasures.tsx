import { spawn } from "child_process";
import React from "react";
import { Form } from "semantic-ui-react";
import { Spawn } from "../../Data";
import { Helpers } from "../../helpers";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";

const Treasures = () =>  {
    const { monsterData: {spawns} } = useDungeon();

    const getHtml = (description:string, index: number) => {
        const html = Helpers.parseEffectText(`<b>${index + 1}:</b> ${description}`);
        return <div dangerouslySetInnerHTML={{__html:html}}/>
    }

    const treasures = spawns.filter( spawn => spawn.category === "treasures").map( (spawn: Spawn) => spawn.description);
    return <Form.Field>
                <label>Treasures:</label>
                {treasures && treasures.map(getHtml)}
            </Form.Field>
}

export default Treasures;