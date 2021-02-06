import React from  "react";
import { Button, Form, Label } from "semantic-ui-react";

type TumblerProps = {
    value: number;
    step: number;
    label: string;
    onChange: (value: number) => void;
  };
  
  const Tumblers = (props: TumblerProps) => {
    const { label, value, step, onChange } = props;
  
    const changeValue = (diff: number) => {
      console.log("changing", label, "by", diff);
      const newVal = value + diff
      onChange(newVal);
    };
  
    return (
      <Form.Group inline>
        <label>{label}</label>
        <Button size="mini"
          onClick={() => {
            changeValue(-step);
          }}
        >
          -
        </Button>
        <label>{value.toFixed(2)}</label>
        <Button size="mini"
          onClick={() => {
            changeValue(step);
          }}
        >
          +
        </Button>
      </Form.Group>
    );
  };

  export default Tumblers;