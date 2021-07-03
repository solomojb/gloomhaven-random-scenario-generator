import React, { createContext, FC, useContext, useMemo } from "react"
import HexUtils from "./HexUtils";
import Orientation from "./models/Orientation";
import Point from "./models/Point";

type PointsMap = {
    [k in string] : string;
  }
  
type LayoutContextType = {
  origin: Point;
  size: Point;
  spacing: number;
  orientation: Orientation;
  points: PointsMap;
  rotateHex: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const getPoints =(corners: Point[], starting: number, count = 6) => {
  return [...Array(count)].map((_c, index) => corners[(index +starting)%6]);
}

export const createLayouts = (flat: boolean, size: Point) => {
  const originalCorners = HexUtils.calculateCoordinates(flat, size);

  const drCorners = HexUtils.calculateCoordinates(flat, size, {x:1.5 * size.x, y:size.y/2 * Math.sqrt(3)});
  const dlCorners = HexUtils.calculateCoordinates(flat, size, {y:1.5 * size.x, x:-size.y/2 * Math.sqrt(3)});
  const dCorners = HexUtils.calculateCoordinates(flat, size, {x:0, y:size.y * Math.sqrt(3)});
  const d2x1 = [...getPoints(originalCorners,2), ...getPoints(dCorners,0,4)];

  const rCorners = HexUtils.calculateCoordinates(flat, size, {y:0, x:-size.x * Math.sqrt(3)});
  const lCorners = HexUtils.calculateCoordinates(flat, size, {y:0, x:size.x * Math.sqrt(3)});
  const r2x1 = [...getPoints(originalCorners,3,5), ...getPoints(rCorners, 0,5)];
  const triangle = [...getPoints(originalCorners, 2, 5), ...getPoints(drCorners,5,4), ...getPoints(dCorners,1,4)];
  const triangleA = [...getPoints(originalCorners,3,5), ...getPoints(dlCorners,5,4), ...getPoints(rCorners,1,4)];

  return {
      "1x1Hex": HexUtils.convertToString(originalCorners),
      "2x1D": HexUtils.convertToString(d2x1),
      "2x1R": HexUtils.convertToString(r2x1),
      "2x3": HexUtils.convertToString(triangle),
      "2x3A": HexUtils.convertToString(triangleA),
  }
}

type Props = {
    className?: string,
    flat?: boolean,
    origin?: Point,
    size?: Point,
    spacing?: number,
  };
  

export const useLayout = () => {
    const result = useContext(LayoutContext);
    if (!result) {
        throw Error("No context. Call this inside a LayoutProvider");
    }
    return result;
}

export const LayoutProvider:FC<Props> = (props) => {
    const { children, flat = false, origin = {x:0, y:0}, spacing = 1, size ={x:6.2, y:6.2}} = props;
    const orientation = HexUtils.getOrientation(flat);
    const points = createLayouts(flat, size);
    const value = useMemo(() => ({
        size,
        origin,
        spacing,
        orientation,
        points,
        rotateHex: !flat,
    }),[orientation, points]);

    const { Provider } = LayoutContext;

    return (<Provider value={value}>
          {children}
    </Provider>);
}

export default LayoutProvider;
