import React from "react";
import { Form } from "semantic-ui-react";
import { ShowFlags } from "../../../../State/ItemViewState";
import { getItemViewState } from "../../../../State/Selectors";
import DisplayToggle from "../DisplayToggle";
import { useDungeon } from "../DungeonProvider";
import MapTileEditor from "./MapTileEditor";
import OffsetTumblers from "./OffsetTumblers";

const MapEditor = () => {
    const { dungeon, dungeon: {map: {offsetX, offsetY}}, setDungeon } = useDungeon();
  const { showFlags } = getItemViewState();

  const onChanged = (offsetX:number, offsetY:number) => {
      setDungeon({...dungeon, map: { ...dungeon.map, offsetX, offsetY}});
    }

   const showTools = (showFlags & ShowFlags.EditMode) > 0;
  return (
    <>
      <Form.Group inline>
  			<DisplayToggle label="Edit Mode:" flag={ShowFlags.EditMode}/>
        {  showTools &&
          <>
            <DisplayToggle label="Grid:" flag={ShowFlags.Grid} />
            <DisplayToggle label="Spawn Points:" flag={ShowFlags.SpawnPoint} />
            <DisplayToggle label="Obstacles:" flag={ShowFlags.Obstacles} />
            <DisplayToggle label="Corridors:" flag={ShowFlags.Corridors} />
            <DisplayToggle label="Spawns:" flag={ShowFlags.Spawns} />
          </>}
      </Form.Group>
      {  showTools &&<Form.Group>
        <MapTileEditor/>
        <OffsetTumblers onChanged={onChanged} initialX={offsetX} initialY={offsetY} label="Map"/>
      </Form.Group>}
    </>
  );
};

export default MapEditor;
