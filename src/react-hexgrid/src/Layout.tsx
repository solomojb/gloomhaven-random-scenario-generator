import React, { Component, ReactNode } from 'react';
import Point from './models/Point';
import HexUtils from './HexUtils';
import { LayoutProvider } from './LayoutProvider';

type Props = {
  children: ReactNode | ReactNode[];
  className?: string,
  flat: boolean,
  origin?: Point,
  size: Point,
  spacing?: number,
  customLayouts?: object;
};

class Layout extends Component<Props> {
  static defaultProps = {
    size: new Point(10, 10),
    flat: true,
    spacing: 1.0,
    origin: new Point(0, 0)
  }

  getChildContext() {
    const { children, flat, className, customLayouts, ...rest } = this.props;
    const orientation = HexUtils.getOrientation(flat);
    const cornerCoords = HexUtils.calculateCoordinates(flat, this.props.size);
    const normalPoints = {"1x1Hex": cornerCoords.map(point => `${point.x},${point.y}`).join(' ')};
    const points = {...normalPoints, ...customLayouts};
    const childLayout = Object.assign({}, rest, { orientation });

    return {
      layout: childLayout,
      points
    };
  }
  render() {
    const { children, className } = this.props;
    return (
      <LayoutProvider value={this.getChildContext()}>
        <g className={className}>
          {children}
        </g>
      </LayoutProvider>
    );
  }
}

export default Layout;
