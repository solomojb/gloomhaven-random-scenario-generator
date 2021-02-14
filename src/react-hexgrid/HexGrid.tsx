import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';

type Props = {
  width: string | number;
  height: string | number;
  viewBox: string;
  children?: ReactNode | ReactNode[];
}

class HexGrid extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  static defaultProps = {
    width: 800,
    height: 600,
    viewBox: "-50 -50 100 100"
  }

  render() {
    const { width, height, viewBox } = this.props
    return (
      <svg className="grid" width={width} height={height} viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
        {this.props.children}
      </svg>
    );
  }
}
export default HexGrid;
