import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode | ReactNode[];
  x?: string | number;
  y?: string | number;
  className?: string;
}

const Text = (props: Props) => {
    const { children, x,y,className} = props;
    return (
      <text x={x || 0} y={y ? y : '0.3em'} className={className} textAnchor="middle">{children}</text>
    );
}

export default Text;
