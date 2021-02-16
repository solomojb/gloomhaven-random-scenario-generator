import React from "react";
import { Form } from "semantic-ui-react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";

const DoorTypes = () =>  {
    const { dungeon: {entrances, exits} } = useDungeon();

    return <>
            <Form.Group inline>
                <label>Entrances Types:</label>
                {entrances.map( entrance => entrance.aOrB ).sort().join("/")}
            </Form.Group>
            <Form.Group inline>
                <label>Exit Types:</label>
                {exits.map( exit => exit.aOrB ).sort().join("/")}
            </Form.Group>
        </>
}

export default DoorTypes;