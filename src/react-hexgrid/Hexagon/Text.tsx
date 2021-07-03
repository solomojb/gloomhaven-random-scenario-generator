import React, { CSSProperties, FC } from 'react';

type Props = {
  x?: string | number,
  y?: string | number,
  className?: string,
  textStyle?: CSSProperties
  textAnchor? : string;
};

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
const Text:FC<Props> = (props) => {
  const { children, x, y, className, textStyle, textAnchor } = props;
  return (
    <text x={x || 0} y={y ? y : '0.3em'} style={textStyle} className={className} textAnchor={textAnchor || "middle"}>{children}</text>
  );
}

export default Text;
