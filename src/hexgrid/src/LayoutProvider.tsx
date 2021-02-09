import React, { useContext, createContext, ReactNode, useEffect, useState } from 'react'

export type PointsMap = {
    [k in string]?: string;
  };


type Context = {
    layout: object, // TODO Shape
    points: PointsMap
  };

  const initialContext: Context = {
    layout: {},
    points: {}
  }
  

export const LayoutContext = createContext<Context>(initialContext);

export function useLayout() {
    return useContext(LayoutContext);
}

type Props = {
    context: Context;
    children: ReactNode | ReactNode [];
}

const LayoutProvider = (props:Props) => {
    const {context, children} = props;

    const { Provider } = LayoutContext;

    return <Provider value={context}>{children}</Provider>
}
 
export default LayoutProvider;
