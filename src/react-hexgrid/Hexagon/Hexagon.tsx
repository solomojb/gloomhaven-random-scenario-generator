import React, { ReactNode, Component,  MouseEvent, DragEvent, CSSProperties } from 'react';
import Hex from '../models/Hex';
import classnames from 'classnames'
import HexUtils from '../HexUtils';
import { LayoutContext } from '../LayoutProvider';

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
}


class Hexagon extends Component<Props> {
  static contextType = LayoutContext

  state: any;
  constructor(props:Props, context: any) {
    super(props);
    const { q, r, s } = props;
    const { layout } = context;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.state = {hex, pixel};
  }

  // TODO Refactor to reduce duplicate
  componentWillReceiveProps(nextProps:Props) {
    const { q, r, s } = nextProps;
    const { layout } = this.context;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.setState({ hex, pixel });
  }
  onMouseEnter(e: MouseEvent<SVGElement, globalThis.MouseEvent>) {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e, this);
    }
  }
  onMouseOver(e: MouseEvent<SVGElement, globalThis.MouseEvent>) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e, this);
    }
  }
  onMouseLeave(e: MouseEvent<SVGElement, globalThis.MouseEvent>) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e, this);
    }
  }
  onClick(e: MouseEvent<SVGElement, globalThis.MouseEvent>) {
    if (this.props.onClick) {
      this.props.onClick(e, this);
    }
  }
  onDragStart(e: DragEvent<SVGElement>) {
    if (this.props.onDragStart) {
      const targetProps = {
        ...this.state,
        data: this.props.data,
        fill: this.props.fill,
        className: this.props.className
      };
      e.dataTransfer.setData('hexagon', JSON.stringify(targetProps));
      this.props.onDragStart(e, this);
    }
  }
  onDragEnd(e: DragEvent<SVGElement>) {
    if (this.props.onDragEnd) {
      e.preventDefault();
      const success = (e.dataTransfer.dropEffect !== 'none');
      this.props.onDragEnd(e, this, success);
    }
  }
  onDragOver(e: DragEvent<SVGElement>) {
    if (this.props.onDragOver) {
      this.props.onDragOver(e, this);
    }
  }
  onDrop(e: DragEvent<SVGElement>) {
    if (this.props.onDrop) {
      e.preventDefault();
      const target = JSON.parse(e.dataTransfer.getData('hexagon'));
      this.props.onDrop(e, this, target);
    }
  }
  render() {
    const { fill = null, cellStyle = undefined, className, hexType } = this.props;
    const { points} = this.context;
    const fillId = fill ? `url(#${fill})` : undefined;
    const type = hexType || "1x1Hex";
    const { pixel } = this.state;
    return (
      <g
        className={classnames('hexagon-group', className)}
        transform={`translate(${pixel.x}, ${pixel.y})`}
        // @ts-ignore
        draggable="true"
        onMouseEnter={e => this.onMouseEnter(e)}
        onMouseOver={e => this.onMouseOver(e)}
        onMouseLeave={e => this.onMouseLeave(e)}
        onClick={e => this.onClick(e)}
        onDragStart={e => this.onDragStart(e)}
        onDragEnd={e => this.onDragEnd(e)}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        <g className="hexagon">
          <polygon points={points[type]} fill={fillId || undefined} style={cellStyle} />
          {this.props.children}
        </g>
      </g>
    );
  }
}

export default Hexagon;
