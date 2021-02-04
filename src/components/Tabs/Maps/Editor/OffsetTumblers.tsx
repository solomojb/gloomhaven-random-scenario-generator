import React, { useEffect, useState } from "react";
import Tumblers from "../Tumblers";

type Props = {
  onChanged: (x: number, y: number) => void;
  initialX: number;
  initialY: number;
  label: string;
};

const OffsetTumblers = (props: Props) => {
  const { onChanged, initialX, initialY, label } = props;
  const [offsetX, setOffsetX] = useState<number>(initialX);
  const [offsetY, setOffsetY] = useState<number>(initialY);

  useEffect( () => {
      setOffsetX(initialX);
      setOffsetY(initialY);

  }, [initialX, initialY])
  
  return (
    <div>
      <Tumblers
        label={`${label} OffsetX:`}
        value={offsetX}
        step={1}
        onChange={(value: number) => {
          setOffsetX(value);
          onChanged(value, offsetY);
        }}
      />
      <Tumblers
        label={`${label} OffsetY:`}
        value={offsetY}
        step={1}
        onChange={(value: number) => {
          setOffsetY(value);
          onChanged(offsetX, value);
        }}
      />
    </div>
  );
};

export default OffsetTumblers;
