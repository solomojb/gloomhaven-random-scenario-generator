import React  from 'react';
import HexUtils from './HexUtils';
import { useLayout } from './LayoutProvider';
import Hex from './models/Hex';

type Props = {
  start: Hex;
  end: Hex;
}

const Path = (props: Props) => {
  const { start, end } = props;
  const { layout } = useLayout();
  
  const getPoints = () => {
    if (!start || !end) {
      return undefined;
    }
  
    // Get all the intersecting hexes between start and end points
    const distance = HexUtils.distance(start, end);
    const intersects = [];
    const step = 1.0 / Math.max(distance, 1);
    for (let i=0; i<=distance; i++) {
      intersects.push(HexUtils.round(HexUtils.hexLerp(start, end, step * i)));
    }
  
    // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
    let points = 'M';
    points += intersects.map(hex => {
      let p = HexUtils.hexToPixel(hex, layout);
      return ` ${p.x},${p.y} `;
    }).join('L');
  
    return points;
  }

  return (
    <path d={getPoints()}></path>
  );
}

export default Path;
