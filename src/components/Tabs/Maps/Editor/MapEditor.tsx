import React from "react";
import { Form } from "semantic-ui-react";
import { ShowFlags, useFlags } from "../../../Providers/FlagsProvider";
import DisplayToggle from "../DisplayToggle";
import RoomSelectors from "./RoomSelectors";

const MapEditor = () => {
  const { isFlagSet } = useFlags();

   const showTools = isFlagSet(ShowFlags.EditMode);
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
            <DisplayToggle label="Doors:" flag={ShowFlags.Doors} />
            <DisplayToggle label="Selectors:" flag={ShowFlags.Selectors} />
            <DisplayToggle label="Map Info Grid:" flag={ShowFlags.MapInfoGrid} />
          </>}
      </Form.Group>
      {  showTools &&<Form.Group>
        <RoomSelectors/>
      </Form.Group>}
    </>
  );
};

export default MapEditor;
