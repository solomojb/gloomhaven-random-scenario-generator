import React, { FC} from 'react';

type Props = {
  width: string | number;
  height: string | number;
  viewBox?: string;

}

const HexGrid:FC<Props> = (props) => {
  const { children, width = 800, height = 600, viewBox = "-50 -50 100 100" } = props
  return (
    <svg className="grid" width={width} height={height} viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}
export default HexGrid;
