import React, { Component } from 'react';
import Point from './models/Point';

type Props = {
  id: string;
  link: string;
  size: Point;
  patternStyle: Object;
  imageStyle: Object;
}

class Pattern extends Component<Props> {
  static defaultProps = {
    size: new Point(10, 10),
    patternStyle: {},
    imageStyle: {}
  };

  render() {
    const { id, link, size, patternStyle, imageStyle } = this.props;

    return (
      <defs>
        <pattern id={id} patternUnits="objectBoundingBox" x={0} y={0} width={size.x} height={size.y} style={patternStyle}>
          <image xlinkHref={link} x={0} y={0} width={size.x*2} height={size.y*2} style={imageStyle}/>
        </pattern>
      </defs>
    );
  }
}

export default Pattern;
