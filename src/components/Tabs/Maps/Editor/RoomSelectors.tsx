import React from "react" 
import { Form } from "semantic-ui-react";
import { ShowFlags, useFlags } from "../../../Providers/FlagsProvider";
import MapCard from "../MapCard";
import MapSelector from "../MapSelector";
import MonsterCard from "../MonsterCard";
import MonsterSelector from "../MonsterSelector";

const RoomSelectors = ()  => {  
    const { isFlagSet } = useFlags();
    const showSelectors = isFlagSet(ShowFlags.Selectors);
    return (
        <Form.Group>
            <Form.Field>
                <MapSelector/>
                {showSelectors && <MapCard/>}
            </Form.Field>
            <Form.Field>
                <MonsterSelector/>
                {showSelectors && <MonsterCard /> }
            </Form.Field>
        </Form.Group>
    )
}

export default RoomSelectors;