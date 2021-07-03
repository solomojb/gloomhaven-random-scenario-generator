import React from "react"
import { Form } from "semantic-ui-react";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import Map from "./Map";
import { LayoutProvider} from "../../react-hexgrid";

import DoorTypes from "./DoorTypes";
import Penalties from "./Penalties";
import MapInfo2 from "../Tabs/Maps/MapInfo2";
import { Helpers } from "../../helpers";

import "../Tabs/Maps/map.css"

const GRID_SIZE = 40;

const Room = () => {
    const { dungeon, monsterData } = useDungeon();
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
                            <LayoutProvider size={{x:GRID_SIZE, y:GRID_SIZE}}>
                                <MapInfo2/>
                            </LayoutProvider>
                        </Form.Group>
                    </Form.Field>
            </Form.Group>
        </div>
    )
}

export default Room;