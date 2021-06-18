import React, { createContext, FC, useContext, useMemo } from "react"
import HexUtils from "./HexUtils";
import Orientation from "./models/Orientation";
import Point from "./models/Point";

export type PointsMap = {
    [k in string] : string;
  }
  
  export type LayoutData = {
    origin?: Point | undefined;
    size: Point;
    spacing?: number | undefined;
    orientation: Orientation;
  }
type LayoutContextType = {
    layout: LayoutData;
    points: PointsMap;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

type Props = {
    className?: string,
    flat: boolean,
    origin: Point,
    size: Point,
    spacing: number,
    customLayouts?: PointsMap;
  };
  

export const useLayout = () => {
    const result = useContext(LayoutContext);
    if (!result) {
        throw Error("No context. Call this inside a LayoutProvider");
    }
    return result;
}

export const LayoutProvider:FC<Props> = (props) => {
    const { children, flat, className, customLayouts, ...rest } = props;
    const orientation = HexUtils.getOrientation(flat);
    const cornerCoords = HexUtils.calculateCoordinates(flat, props.size);
    const points: PointsMap = {
        ["1x1Hex"] : HexUtils.convertToString(cornerCoords),
        ...customLayouts
    };
    const layout: LayoutData = Object.assign({}, rest, { orientation });

    const value = useMemo(() => ({
        layout,
        points
    }),[layout, points]);

    const { Provider } = LayoutContext;

    return (<Provider value={value}>
        <g className={className}>
          {children}
        </g>
    </Provider>);
}

export default LayoutProvider;
