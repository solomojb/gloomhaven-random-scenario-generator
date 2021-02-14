import React, { createContext, ReactNode } from "react"
import { LayoutData, PointsMap } from "./Layout";

type LayoutContextType = {
    layout: LayoutData;
    points: PointsMap;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

type Props = {
    children: ReactNode | ReactNode[];
    value: LayoutContextType;
}

export const LayoutProvider = (props: Props) => {
    const { children, value : {layout, points} } = props;

    const { Provider } = LayoutContext;

    return (<Provider value={{layout, points}}>
        {children}
    </Provider>);
}
