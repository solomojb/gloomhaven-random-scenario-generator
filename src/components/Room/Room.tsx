import React from "react"
import { Form } from "semantic-ui-react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import Map, { createCustomLayouts } from "./Map";
import { LayoutProvider } from "../../react-hexgrid";

import DoorTypes from "./DoorTypes";
import Penalties from "./Penalties";
import MapInfo from "../Tabs/Maps/MapInfo";
import "../Tabs/Maps/map.css"
import { Helpers } from "../../helpers";

const Room = () => {
    const { dungeon, monsterData } = useDungeon();
    const size = { x: 6.2, y: 6.2 };
    return (
        <div>
            <Form.Group>
                <Form.Field inline>
                    <Form.Group inline>
                        <Form.Field inline>
                            <Form.Group inline>
                                <label>Dungeon:</label>
                                {Helpers.toAllFirstUpper(dungeon.name)}
                            </Form.Group>
                        </Form.Field>
                        <Form.Field inline>
                            <Form.Group inline>
                                <label>Monsters:</label>
                                {Helpers.toAllFirstUpper(monsterData.name)}
                            </Form.Group>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field inline>
                            <Form.Group inline>
                                <label>Tiles:</label>
                                {dungeon.map.tiles.sort().join("/")}
                            </Form.Group>
                        </Form.Field>
                        <DoorTypes/>
                    </Form.Group>
                    <div className="map-tiles">
                        <Map />
                    </div>
                </Form.Field>
                <Form.Field>
                    <Penalties/>
                    <Form.Group>
                        <LayoutProvider
                            flat={false}
                            spacing={1}
                            size={size}
                            origin={{ x: 0, y: 0 }}
                            customLayouts={createCustomLayouts(false, size)}
                        >
                        <MapInfo/>
                        </LayoutProvider>
                    </Form.Group>
                </Form.Field>
            </Form.Group>
        </div>
    )
}

export default Room;