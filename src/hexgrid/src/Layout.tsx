import React, { ReactNode } from 'react';
import Point from './models/Point';
import LayoutProvider from './LayoutProvider';
import HexUtils from './HexUtils';

type Props = {
  children: ReactNode | ReactNode[];
  className?: string,
  flat?: boolean,
  origin?: Point,
  size?: Point,
  spacing?: number,
  customLayouts?: object;
};

const Layout = (props: Props) => {
  const {children, className, flat = true, origin = new Point(10,10), size = new Point(10,10), spacing = 1.0, customLayouts = {}} = props;

  const getChildContext = () => {
    const { ...rest } = props;
    const orientation = HexUtils.getOrientation(flat);
    const points1x1 = HexUtils.calculateCoordinates(flat, size);
    const points1x1Obj = {"1x1Hex": HexUtils.convertToString(points1x1)};
    const points = {...points1x1Obj, ...customLayouts};
    const childLayout = Object.assign({}, rest, { orientation });

    return {
      layout: childLayout,
      points
    };
  }

  return (
    <LayoutProvider context={getChildContext()}>
      <g className={className}>
        {children}
      </g>
    </LayoutProvider>
  );
}

export default Layout;
