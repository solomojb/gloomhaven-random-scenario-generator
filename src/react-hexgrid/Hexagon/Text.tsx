import React, { Component, CSSProperties, ReactNode } from 'react';

type Props = {
  children?: ReactNode | ReactNode[],
  x?: string | number,
  y?: string | number,
  className?: string,
  textStyle?: CSSProperties
};

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
class Text extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { children, x, y, className, textStyle } = this.props;
    return (
      <text x={x || 0} y={y||0} style={textStyle} className={className} textAnchor="start">{children}</text>
    );
  }
}

export default Text;
