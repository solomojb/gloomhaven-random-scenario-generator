import React, { ReactNode, Component,  MouseEvent, DragEvent, CSSProperties, useState } from 'react';
import Hex from '../models/Hex';
import classnames from 'classnames'
import HexUtils from '../HexUtils';
import { LayoutContext, useLayout } from '../LayoutProvider';

type EventParams = any;

type Props = {
  q: number,
  r: number,
  s: number
  fill?: string,
  cellStyle?: CSSProperties;
  className?: string,
  data?: object,
  onMouseEnter?: (e: MouseEvent<SVGElement, globalThis.MouseEvent>, source: EventParams) => void,
  onMouseOver?: (e: MouseEvent<SVGElement, globalThis.MouseEvent>, source: EventParams) => void,
  onMouseLeave?: (e: MouseEvent<SVGElement, globalThis.MouseEvent>, source: EventParams) => void,
  onClick?: (e: MouseEvent<SVGElement, globalThis.MouseEvent>, source: EventParams) => void,
  onDragStart?: (e: DragEvent<SVGElement>, source: EventParams) => void,
  onDragEnd?: (e: DragEvent<SVGElement>, source: EventParams, success:boolean) => void,
  onDragOver?: (e: DragEvent<SVGElement>, source: EventParams) => void,
  onDrop?: (e: DragEvent<SVGElement>, source: EventParams,  target: object) => void,
  children?: ReactNode | ReactNode[],
  hexType?: string,
  rotation?: number,
}

const Hexagon = (props:Props) => {
  const { layout, points } = useLayout();
  const { children, fill = null, cellStyle = undefined, className, hexType, rotation = 0, q, r, s, onClick } = props;
  const hex = new Hex(q, r, s);
  const pixel = HexUtils.hexToPixel(hex, layout);
  const fillId = fill ? `url(#${fill})` : undefined;
  const type = hexType || "1x1Hex";

  const doClick = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    if (onClick) {
      onClick(e, {});
    }
  }

  return (
    <g
      className={classnames('hexagon-group', className)}
      transform={`translate(${pixel.x}, ${pixel.y}) rotate(${rotation} 0 0)`}
      onClick={doClick}
    >
      <g className="hexagon">
        <polygon points={points[type]} fill={fillId || undefined} style={cellStyle} />
        {children}
      </g>
    </g>
  );
}

export default Hexagon;
