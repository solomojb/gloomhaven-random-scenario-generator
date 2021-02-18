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

const Room = () => {
    const { dungeon } = useDungeon();
    console.log("rendering room");
    return (
        <>
            <Form.Group>{dungeon.name}</Form.Group>
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
            <MapInfo/>
        </>
    )
}

export default Room;