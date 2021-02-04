import React from "react";
import { useDispatch } from "react-redux";
import { ShowFlags } from "../../../../State/ItemViewState";
import { MapData } from "../../../../State/MapData";
import { getItemViewState } from "../../../../State/Selectors";
import { storeMapOffsetX, storeMapOffsetY } from "../../../../State/State";
import DisplayToggle from "../DisplayToggle";
import MapTileEditor from "./MapTileEditor";
import OffsetTumblers from "./OffsetTumblers";

type Props = {
    dungeonData: MapData;
}

const MapEditor = (props: Props) => {
    const { dungeonData } = props;
    const dispatch = useDispatch();
    const { mapOffsetY, mapOffsetX } = getItemViewState();

    const onChanged = (x:number, y:number) => {
        dispatch(storeMapOffsetX(x));
        dispatch(storeMapOffsetY(y));
    }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DisplayToggle label="Grid:" flag={ShowFlags.Grid} />
        <DisplayToggle label="Spawn Points:" flag={ShowFlags.SpawnPoint} />
        <DisplayToggle label="Obstacles:" flag={ShowFlags.Obstacles} />
        <DisplayToggle label="Corridors:" flag={ShowFlags.Corridors} />
        <DisplayToggle label="Spawns:" flag={ShowFlags.Spawns} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MapTileEditor dungeonData={dungeonData}/>
        <OffsetTumblers onChanged={onChanged} initialX={mapOffsetX} initialY={mapOffsetY} label="Map"/>
      </div>
    </div>
  );
};

export default MapEditor;
