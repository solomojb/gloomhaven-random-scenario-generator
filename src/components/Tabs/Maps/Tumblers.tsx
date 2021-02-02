import React from  "react";
import { Button, Label } from "semantic-ui-react";

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
      onChange(newVal);
    };
  
    return (
      <div>
        <Label>{label}</Label>
        <Button
          onClick={() => {
            changeValue(false);
          }}
        >
          -
        </Button>
        <Label>{value}</Label>
        <Button
          onClick={() => {
            changeValue(true);
          }}
        >
          +
        </Button>
      </div>
    );
  };

  export default Tumblers;