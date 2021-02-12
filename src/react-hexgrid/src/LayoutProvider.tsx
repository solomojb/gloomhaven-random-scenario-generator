import React, { createContext, ReactNode } from "react"

type LayoutContextType = {
    layout: Object;
    points: Object;
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