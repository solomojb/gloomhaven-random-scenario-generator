import React, { useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import { useDispatch } from "react-redux";
import { storeShowGrid } from "../../../State/State";
import { getItemViewState } from "../../../State/Selectors";

const MapContainer = () => {
    const game = useGame();
    const [selectedMap, setSelectedMap] = useState<string>(game.getDungeonList()[0]);
    const { showGrid } = getItemViewState();
    const dispatch = useDispatch();

    const onChange = (obj:any, e:DropdownProps):void => {
        setSelectedMap(e.value as string);
    }

    const dungeonData = game.getDungeonData(selectedMap);

    return (<>
        <MapSelector defaultMapName={selectedMap} onChange={onChange}></MapSelector>
        <Form.Group inline>
                <label>Show Grid:</label>
                <Form.Checkbox
                    toggle
                    checked={showGrid}
                    onClick={() => {
                        dispatch(storeShowGrid(!showGrid));
                    }}/>
            </Form.Group>        {selectedMap && dungeonData && (
            <div className="map-container">
                <Map data={dungeonData}/>
                <MapCard data={dungeonData}/>
            </div>)}
        </>)
}

export default MapContainer;