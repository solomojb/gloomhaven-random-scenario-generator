import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Orientation from './models/Orientation';
import Point from './models/Point';
import LayoutProvider from './LayoutProvider';

type Props = {
  children: ReactNode | ReactNode[];
  className?: string,
  flat?: boolean,
  origin?: Point,
  size?: Point,
  spacing?: number,
  addCustomLayouts?: (corners: Point[], size: Point ) => {};
};

const LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
const LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);

const Layout = (props: Props) => {
  const {children, className, flat = true, origin = new Point(10,10), size = new Point(10,10), spacing = 1.0, addCustomLayouts} = props;

  const calculateCoordinates = (orientation:Orientation) => {
    const corners: Point[] = [];
    const center = new Point(0, 0);

    Array.from(new Array(6), (x, i) => {
      const offset = getPointOffset(i, orientation, size);
      const point = new Point(center.x + offset.x, center.y + offset.y);
      corners.push(point);
    });

    return corners;
  }

  const getChildContext = () => {
    const { ...rest } = props;
    const orientation = (flat) ? LAYOUT_FLAT : LAYOUT_POINTY;
    const cornerCoords = calculateCoordinates(orientation);
    const normalPoints = {"normal": cornerCoords.map(point => `${point.x},${point.y}`).join(' ')};
    const cornerCoords2 = addCustomLayouts && addCustomLayouts(cornerCoords, size);
    const points = {...normalPoints, ...cornerCoords2};
    const childLayout = Object.assign({}, rest, { orientation });

    return {
      layout: childLayout,
      points
    };
  }

  const getPointOffset= (corner: number, orientation: Orientation, size:Point) => {
    let angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
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
