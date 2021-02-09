import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Point from './models/Point';

type Props = {
  id:string;
  link:string;
  size?:Point;
  style?:object;
  imageStyle?:object;
}

const Pattern = (props: Props) => {
  const {id, link, size = new Point(10, 10), style={}, imageStyle={}} = props;
  return (
    <defs>
      <pattern id={id} patternUnits="objectBoundingBox" x={0} y={0} width={size.x} height={size.y} style={style}>
        <image xlinkHref={link} x={0} y={0} width={size.x*2} height={size.y*2} style={imageStyle}/>
      </pattern>
    </defs>
  );
}
export default Pattern;
