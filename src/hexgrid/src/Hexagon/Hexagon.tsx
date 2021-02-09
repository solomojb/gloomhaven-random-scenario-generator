import React, { ReactNode, useState, MouseEvent, DragEvent, CSSProperties } from 'react';
import Hex from '../models/Hex';
import HexUtils from '../HexUtils';
import Point from '../models/Point';
import { useLayout } from '../LayoutProvider';

type EventParams = {
  hex:Hex;
  pixel: Point;
}

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
}

type contextTypes = {
  layout: object, // TODO Shape
  points: object
};


const Hexagon = (props: Props) => {
  const {q, r, s, fill, cellStyle, className, hexType, data, children, onMouseEnter, onMouseLeave, onMouseOver, onClick, onDragStart, onDragEnd, onDragOver, onDrop} = props;
  const { layout, points } = useLayout();
  const initialHex = new Hex(q, r, s);
  const initialPixel = HexUtils.hexToPixel(initialHex, layout);
  const [hex, setHex] = useState<Hex>(initialHex);
  const [pixel, setPixel] = useState<Point>(initialPixel);

  const mouseEnter = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    if (onMouseEnter) {
      onMouseEnter(e, {hex, pixel});
    }
  }
  const mouseOver = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    if (onMouseOver) {
      onMouseOver(e, {hex, pixel});
    }
  }
  const mouseLeave= (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    if (onMouseLeave) {
      onMouseLeave(e, {hex, pixel});
    }
  }
  const click= (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    if (onClick) {
      onClick(e, {hex, pixel});
    }
  }
  const dragStart= (e: DragEvent<SVGElement>) => {
    if (onDragStart) {
      const targetProps = {
        hex,
        pixel,
        data,
        fill,
        className
      };
      e.dataTransfer.setData('hexagon', JSON.stringify(targetProps));
      onDragStart(e, {hex, pixel});
    }
  }
  const dragEnd= (e: DragEvent<SVGElement>) => {
    if (onDragEnd) {
      e.preventDefault();
      const success = (e.dataTransfer.dropEffect !== 'none');
      onDragEnd(e, {hex, pixel}, success);
    }
  }
  const dragOver= (e: DragEvent<SVGElement>) => {
    if (onDragOver) {
      onDragOver(e, {hex, pixel});
    }
  }
  const drop= (e: DragEvent<SVGElement>) => {
    if (onDrop) {
      e.preventDefault();
      const target = JSON.parse(e.dataTransfer.getData('hexagon'));
      onDrop(e, {hex, pixel}, target);
    }
  }

  const fillId = (fill) ? `url(#${fill})` : null;
  const type = hexType || "normal";
  return (
    <g
      className={`hexagon-group ${className}`}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      // draggable="true"
      onMouseEnter={mouseEnter}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      onClick={click}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDrop={drop}
    >
      <g className="hexagon">
        <polygon points={points[type]} fill={fillId || ""} style={cellStyle} />
        {children}
      </g>
    </g>
  );

}

export default Hexagon;
