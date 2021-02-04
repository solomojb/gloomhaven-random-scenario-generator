import React from "react";
import { ShowFlags } from "../../../../State/ItemViewState";
import DisplayToggle from "../DisplayToggle";
import { useDungeon } from "../DungeonProvider";
import MapTileEditor from "./MapTileEditor";
import OffsetTumblers from "./OffsetTumblers";

type Props = {
}

const MapEditor = (props: Props) => {
    const { dungeon, setDungeon } = useDungeon();

    const onChanged = (offsetX:number, offsetY:number) => {
      setDungeon({...dungeon, offsetX, offsetY});
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
        <MapTileEditor/>
        <OffsetTumblers onChanged={onChanged} initialX={dungeon.offsetX} initialY={dungeon.offsetY} label="Map"/>
      </div>
    </div>
  );
};

export default MapEditor;
