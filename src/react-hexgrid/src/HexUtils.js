import Hex from './models/Hex';
import Orientation from './models/Orientation';
import Point from './models/Point';

class HexUtils {

  static DIRECTIONS = [
    new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
    new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
  ];

  static equals(a, b) {
    return a.q === b.q && a.r === b.r && a.s === b.s;
  }

  static add(a, b) {
    return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
  }

  static subtract(a, b) {
    return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
  }

  static multiply(a, k) {
    return new Hex(a.q * k, a.r * k, a.s * k);
  }

  static lengths(hex) {
    return parseInt((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
  }

  static distance(a, b) {
    return HexUtils.lengths(HexUtils.subtract(a, b));
  }

  static direction(direction) {
    return HexUtils.DIRECTIONS[(6 + (direction % 6)) % 6];
  }

  static neighbour(hex, direction) {
    return HexUtils.add(hex, HexUtils.direction(direction));
  }

  static neighbours(hex) {
    const array = [];
    for (let i = 0; i < HexUtils.DIRECTIONS.length; i += 1) {
      array.push(HexUtils.neighbour(hex, i));
    }

    return array;
  }

  static round(hex) {
    let rq = Math.round(hex.q)
    let rr = Math.round(hex.r)
    let rs = Math.round(hex.s)

    const qDiff = Math.abs(rq - hex.q)
    const rDiff = Math.abs(rr - hex.r)
    const sDiff = Math.abs(rs - hex.s)

    if (qDiff > rDiff && qDiff > sDiff)
        rq = -rr-rs
    else if (rDiff > sDiff)
        rr = -rq-rs
    else
        rs = -rq-rr

    return new Hex(rq, rr, rs);
  }

  static hexToPixel(hex, layout) {
    const s = layout.spacing;
    const M = layout.orientation;
    let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
    let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
    // Apply spacing
    x = x * s;
    y = y * s;
    return new Point(x + layout.origin.x, y + layout.origin.y);
  }

  static pixelToHex(point, layout) {
    const M = layout.orientation;
    const pt = new Point((point.x - layout.origin.x) / layout.size.x, (point.y - layout.origin.y) / layout.size.y);
    const q = M.b0 * pt.x + M.b1 * pt.y;
    const r = M.b2 * pt.x + M.b3 * pt.y;
    const hex = new Hex(q, r, -q - r);
    return HexUtils.round(hex);
  }

  static lerp(a, b, t) {
    return a + ((b - a) * t);
  }

  static hexLerp(a, b, t) {
    return new Hex(HexUtils.lerp(a.q, b.q, t), HexUtils.lerp(a.r, b.r, t), HexUtils.lerp(a.s, b.s, t));
  }

  static getID(hex) {
    return `${hex.q},${hex.r},${hex.s}`;
  }

  static  getPointOffset(corner, orientation, size) {
    let angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }

  static LAYOUT_FLAT = new Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0),2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
  static LAYOUT_POINTY = new Orientation(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);

  static getOrientation(flat) {
    return (flat) ? HexUtils.LAYOUT_FLAT : HexUtils.LAYOUT_POINTY;
  }

  static calculateCoordinates(flat, size, center = {x:0, y:0}){
    const orientation = HexUtils.getOrientation(flat);
    const corners = [];
    Array.from(new Array(6), (x, i) => {
      const offset = HexUtils.getPointOffset(i, orientation, size);
      const point = new Point(center.x + offset.x, center.y + offset.y);
      corners.push(point);
    });

    return corners;
  }

  static convertToString( points) {
    return points.map(point => `${point.x},${point.y}`).join(' ')
  }
}

export default HexUtils;
