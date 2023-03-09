import React, { useEffect, useState } from "react";
import Tumblers from "../Tumblers";

type Props = {
  onChanged: (point:Point) => void;
  initialPoint: Point;
  label: string;
  step?: number;
};

const OffsetTumblers = (props: Props) => {
  const { onChanged, initialPoint, label, step = 1 } = props;
  const [point, setPoint] = useState<Point>(initialPoint);

  useEffect( () => {
    setPoint(initialPoint);
  }, [initialPoint])

  useEffect(()=> {
    onChanged(point)
  }, [point, onChanged]);

  const handleKey = (e:any) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        setPoint( current => ({...current, y:current.y - step}));
      break;
      case "ArrowDown":
        setPoint( current => ({...current, y:current.y + step}));
      break;
      case "ArrowLeft":
        setPoint( current => ({...current, x:current.x - step}));
        break;
      case "ArrowRight":
        setPoint( current => ({...current, x:current.x + step}));
        break;
      }
  }
  
  return (
    <div onKeyDown={handleKey} tabIndex={0}>
      <Tumblers
        label={`${label} X:`}
        value={point.x}
        step={step}
        onChange={(value: number) => {
          setPoint( current => ({...current, x:value}));
        }}
      />
      <Tumblers
        label={`${label} Y:`}
        value={point.y}
        step={step}
        onChange={(value: number) => {
          setPoint( current => ({...current, y:value}));
        }}
      />
    </div>
  );
};

export default OffsetTumblers;
