import React from "react"
import { Form } from "semantic-ui-react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import Map from "./Map";

import DoorTypes from "./DoorTypes";
import Penalties from "./Penalties";
import Treasures from "./Treasures";
import Traps from "./Traps";
import MapInfo from "../Tabs/Maps/MapInfo";
import "../Tabs/Maps/map.css"
import { Helpers } from "../../helpers";

const Room = () => {
    const { dungeon } = useDungeon();
    console.log("rendering room");
    return (
        <Form.Group>
            <Form.Field>
                <Form.Group>{Helpers.toAllFirstUpper(dungeon.name)}</Form.Group>
                <div className="map-tiles">
                    <Map />
                </div>
                <div style={{marginTop:"30px"}}>
                    <Form.Group inline>
                        <label>Tiles:</label>
                        {dungeon.map.tiles.map( tile => tile.tile).sort().join("/")}
                    </Form.Group>
                    <DoorTypes/>
                    <Penalties/>
                    <Treasures/>
                    <Traps/>
                </div>
            </Form.Field>
            <MapInfo/>
        </Form.Group>
    )
}

export default Room;