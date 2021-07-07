import React from "react"
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import Map from "./Map";
import { LayoutProvider} from "../../react-hexgrid";

import Penalties from "./Penalties";
import MapInfo from "./MapInfo";
import { Helpers } from "../../helpers";

import "../Tabs/Maps/map.css"
import "./room.css"

const GRID_SIZE = 40;

const Room = () => {
    const { dungeon:{entrances, exits, name, map: {tiles}}, monsterData:{name:monsterName} } = useDungeon();

    return (
        <div className="room-container">
            <div>
                <div className="room-info">
                    <div className="info-label">
                        <label>Dungeon:</label>
                        {Helpers.toAllFirstUpper(name)}
                    </div>
                    <div className="info-label">
                        <label>Monsters:</label>
                        {Helpers.toAllFirstUpper(monsterName)}
                    </div>
                </div>
                <div className="tile-info">
                    <div className="info-label">
                        <label>Tiles:</label>
                        {tiles.sort().join("/")}
                    </div>
                    <div className="info-label">
                        <label>Entrances Types:</label>
                        {entrances.map( entrance => entrance.aOrB ).sort().join("/")}
                    </div>
                    <div className="info-label">
                        <label>Exit Types:</label>
                        {exits.map( exit => exit.aOrB ).sort().join("/")}
                    </div>
                </div>
                <div className="map-tiles">
                    <Map />
                </div>
            </div>
            <div>
                <Penalties/>
                <LayoutProvider size={{x:GRID_SIZE, y:GRID_SIZE}} origin={{x:300,y:320}}>
                    <MapInfo/>
                </LayoutProvider>
            </div> 
        </div>
    )
}

export default Room;