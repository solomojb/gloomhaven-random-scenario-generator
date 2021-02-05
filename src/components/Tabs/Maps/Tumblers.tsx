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
  
    const changeValue = (up: boolean) => {
      const newVal = value + (up ? step : -step);
      onChange(parseFloat(newVal.toFixed(2)));
    };
  
    return (
      <Form.Group inline>
        <label>{label}</label>
        <Button size="mini"
          onClick={() => {
            changeValue(false);
          }}
        >
          -
        </Button>
        <label>{value}</label>
        <Button size="mini"
          onClick={() => {
            changeValue(true);
          }}
        >
          +
        </Button>
      </Form.Group>
    );
  };

  export default Tumblers;