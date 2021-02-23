import React from  "react";
import { Form } from "semantic-ui-react";
import { ShowFlags, useFlags } from "../../Providers/FlagsProvider";

type DisplayToggleProps = {
    flag: ShowFlags;
    label: string;
  };
  
  const DisplayToggle = (props: DisplayToggleProps) => {
    const { label, flag } = props;
    const { toggleFlag, isFlagSet }  = useFlags();
  
    const changeValue = () => {
      toggleFlag(flag);
    };
  
    return (
        <Form.Group inline>
          <label>{label}</label>
          <Form.Checkbox
            toggle
            checked={isFlagSet(flag)}
            onClick={changeValue}
          />
        </Form.Group>
    );
  };

  export default DisplayToggle;