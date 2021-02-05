import React from  "react";
import { useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";
import { ShowFlags } from "../../../State/ItemViewState"
import { getItemViewState } from "../../../State/Selectors";
import { storeShowFlags } from "../../../State/State";

type DisplayToggleProps = {
    flag: ShowFlags;
    label: string;
  };
  
  const DisplayToggle = (props: DisplayToggleProps) => {
    const { label, flag } = props;
    const { showFlags }  = getItemViewState();
    const dispatch = useDispatch();
  
    const changeValue = () => {
        let newFlags = showFlags;
        if ((flag & showFlags) > 0) {
            newFlags &= ~flag;
        } else { 
            newFlags |= flag;
        }
        localStorage.setItem("showFlags", newFlags.toString());
        dispatch(storeShowFlags(newFlags));
    };
  
    return (
        <Form.Group inline>
          <label>{label}</label>
          <Form.Checkbox
            toggle
            checked={(showFlags & flag) > 0}
            onClick={changeValue}
          />
        </Form.Group>
    );
  };

  export default DisplayToggle;