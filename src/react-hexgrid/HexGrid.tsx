import React, { FC } from 'react';

type Props = {
  className?: string;
}

const HexGrid:FC<Props> = (props) => {
    const { children, className} = props
    return (
      <div className={className}>
        {children}
      </div>
    );
}

export default HexGrid;