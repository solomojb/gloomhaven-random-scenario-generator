import React from 'react';
import Point from './models/Point';

type Props = {
  id: string;
  link: string;
  size: Point;
  patternStyle?: Object;
  imageStyle?: Object;
  xOffset?:number;
  yOffset?:number;
  patternXOffset?:number;
  patternYOffset?:number;
}

const Pattern = (props: Props) => {
    const { id, link, size = {x: 10, y:10}, patternStyle, imageStyle, xOffset=0, yOffset=0, patternXOffset=0, patternYOffset=0 } = props;

  return (
    <defs>
      <pattern id={id} patternUnits="objectBoundingBox" x={patternXOffset} y={patternYOffset} width={size.x} height={size.y} style={patternStyle}>
        <image xlinkHref={link} x={xOffset} y={yOffset} width={size.x*2} height={size.y*2} style={imageStyle}/>
      </pattern>
    </defs>
  );
}

export default Pattern;
