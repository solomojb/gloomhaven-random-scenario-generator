import React from 'react';
import Point from './models/Point';

type Props = {
  id: string;
  link: string;
  size: Point;
  patternStyle?: Object;
  imageStyle?: Object;
}

const Pattern = (props: Props) => {
    const { id, link, size = {x: 10, y:10}, patternStyle, imageStyle } = props;

  return (
    <defs>
      <pattern id={id} patternUnits="objectBoundingBox" x={0} y={0} width={size.x} height={size.y} style={patternStyle}>
        <image xlinkHref={link} x={0} y={0} width={size.x*2} height={size.y*2} style={imageStyle}/>
      </pattern>
    </defs>
  );
}

export default Pattern;
