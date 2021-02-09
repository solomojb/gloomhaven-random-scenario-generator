import Hex from './models/Hex';
import Point from './models/Point';

class HexUtils {

  static DIRECTIONS = [
    new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
    new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
  ];

  static equals(a:Hex, b:Hex):boolean {
    return a.q == b.q && a.r == b.r && a.s == b.s;
  }

  static add(a:Hex, b:Hex):Hex {
    return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
  }

  static subtract(a:Hex, b:Hex):Hex {
    return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
  }

  static multiply(a:Hex, k:number):Hex {
    return new Hex(a.q * k, a.r * k, a.s * k);
  }

  static lengths(hex:Hex) : number {
    return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
  }

  static distance(a:Hex, b:Hex) : number {
    return HexUtils.lengths(HexUtils.subtract(a, b));
  }

  static direction(direction: number) : Hex {
    return HexUtils.DIRECTIONS[(6 + (direction % 6)) % 6];
  }

  static neighbour(hex:Hex, direction: number): Hex {
    return HexUtils.add(hex, HexUtils.direction(direction));
  }

  static neighbours(hex:Hex): Hex[] {
    const array = [];
    for (let i = 0; i < HexUtils.DIRECTIONS.length; i += 1) {
      array.push(HexUtils.neighbour(hex, i));
    }

    return array;
  }

  static round(hex:Hex): Hex {
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

  static hexToPixel(hex:Hex, layout: any) : Point {
    if (!layout.size) {
      console.log("uhoh");
    }
    const s = layout.spacing;
    const M = layout.orientation;
    let x = (M.f0 * hex.q + M.f1 * hex.r) * layout.size.x;
    let y = (M.f2 * hex.q + M.f3 * hex.r) * layout.size.y;
    // Apply spacing
    x = x * s;
    y = y * s;
    return new Point(x + layout.origin.x, y + layout.origin.y);
  }

  static pixelToHex(point:Point, layout: any) : Hex {
    const M = layout.orientation;
    const pt = new Point((point.x - layout.origin.x) / layout.size.x, (point.y - layout.origin.y) / layout.size.y);
    const q = M.b0 * pt.x + M.b1 * pt.y;
    const r = M.b2 * pt.x + M.b3 * pt.y;
    const hex = new Hex(q, r, -q - r);
    return HexUtils.round(hex);
  }

  static lerp(a:number, b:number, t:number) : number {
    return a + ((b - a) * t);
  }

  static hexLerp(a:Hex, b:Hex, t:number) : Hex {
    return new Hex(HexUtils.lerp(a.q, b.q, t), HexUtils.lerp(a.r, b.r, t), HexUtils.lerp(a.s, b.s, t));
  }

  static getID(hex:Hex) : string {
    return `${hex.q},${hex.r},${hex.s}`;
  }
}

export default HexUtils;
