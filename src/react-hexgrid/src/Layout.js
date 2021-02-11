import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Orientation from './models/Orientation';
import Point from './models/Point';
import HexUtils from './HexUtils';

class Layout extends Component {
  static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
  static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    flat: PropTypes.bool,
    origin: PropTypes.object,
    size: PropTypes.object,
    spacing: PropTypes.number,
    customLayouts: PropTypes.object
  };

  static defaultProps = {
    size: new Point(10, 10),
    flat: true,
    spacing: 1.0,
    origin: new Point(0, 0)
  }

  static childContextTypes = {
    layout: PropTypes.object, // TODO Shape
    points: PropTypes.object
  };

  getChildContext() {
    const { children, flat, className, customLayouts, ...rest } = this.props;
    const orientation = (flat) ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
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
      <g className={className}>
        {children}
      </g>
    );
  }
}

export default Layout;
