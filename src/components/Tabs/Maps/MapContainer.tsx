import React, { useState } from "react";
import { DropdownProps } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";

const MapContainer = () => {
    const game = useGame();
    const [selectedMap, setSelectedMap] = useState<string>(game.getDungeonList()[0]);

    const onChange = (obj:any, e:DropdownProps):void => {
        setSelectedMap(e.value as string);
    }

    const dungeonData = game.getDungeonData(selectedMap);

    return (<>
        <MapSelector defaultMapName={selectedMap} onChange={onChange}></MapSelector>
        {selectedMap && dungeonData && (
            <>
                <Map data={dungeonData}/>
                <MapCard data={dungeonData}/>
            </>)}
        </>)
}

export default MapContainer;