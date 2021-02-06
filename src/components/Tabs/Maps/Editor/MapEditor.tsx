import React from "react";
import { Form } from "semantic-ui-react";
import { ShowFlags } from "../../../../State/ItemViewState";
import { getItemViewState } from "../../../../State/Selectors";
import DisplayToggle from "../DisplayToggle";
import MapTileEditor from "./MapTileEditor";

const MapEditor = () => {
  const { showFlags } = getItemViewState();

   const showTools = (showFlags & ShowFlags.EditMode) > 0;
  return (
    <>
      <Form.Group inline>
  			<DisplayToggle label="Edit Mode:" flag={ShowFlags.EditMode}/>
        {  showTools &&
          <>
            <DisplayToggle label="All Grid:" flag={ShowFlags.AllGrid} />
            <DisplayToggle label="Grid:" flag={ShowFlags.Grid} />
            <DisplayToggle label="Spawn Points:" flag={ShowFlags.SpawnPoint} />
            <DisplayToggle label="Obstacles:" flag={ShowFlags.Obstacles} />
            <DisplayToggle label="Corridors:" flag={ShowFlags.Corridors} />
            <DisplayToggle label="Spawns:" flag={ShowFlags.Spawns} />
          </>}
      </Form.Group>
      {  showTools &&<Form.Group>
        <MapTileEditor/>
      </Form.Group>}
    </>
  );
};

export default MapEditor;
