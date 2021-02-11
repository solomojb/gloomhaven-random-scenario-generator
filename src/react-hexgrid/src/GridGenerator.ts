import Hex from './models/Hex';
import HexUtils from './HexUtils'

class GridGenerator {

  static ring (center: Hex, mapRadius: number) {
    let hexas = [];
    let hex = HexUtils.add(center, HexUtils.multiply(HexUtils.direction(4), mapRadius));
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < mapRadius; j++) {
        hexas.push(hex);
        hex = HexUtils.neighbour(hex, i);
      }
    }
    return hexas;
  }

  static spiral(center: Hex, mapRadius: number){
    let results = [center];
    for (let k = 1; k <= mapRadius; k++) {
      const temp = GridGenerator.ring(center, k);
      results = results.concat(temp);
    }
    return results;
  }

  static parallelogram(q1:number, q2:number, r1: number, r2: number) {
    let hexas = [];
    for (let q = q1; q <= q2; q++) {
      for (let r = r1; r <= r2; r++) {
        hexas.push(new Hex(q, r, -q-r));
      }
    }

    return hexas;
  }

  static triangle(mapSize: number) {
    let hexas = [];
    for (let q = 0; q <= mapSize; q++) {
      for (let r = 0; r <= mapSize - q; r++) {
        hexas.push(new Hex(q, r, -q-r));
      }
    }

    return hexas;
  }

  static hexagon(mapRadius: number) {
    let hexas = [];
    for (let q = -mapRadius; q <= mapRadius; q++) {
      let r1 = Math.max(-mapRadius, -q - mapRadius);
      let r2 = Math.min(mapRadius, -q + mapRadius);
      for (let r = r1; r <= r2; r++) {
        hexas.push(new Hex(q, r, -q-r));
      }
    }

    return hexas;
  }

  static rectangle(mapWidth:number, mapHeight:number, qOffset:number = 0, rStart:number = 0) {
    let hexas = [];
    for (let r = rStart; r < mapHeight; r++) {
      let offset = Math.floor(r/2) + qOffset; // or r>>1
      for (let q = -offset; q < mapWidth - offset; q++) {
        hexas.push(new Hex(q, r, -q-r));
      }
    }

    return hexas;
  }

  static orientedRectangle(mapWidth: number, mapHeight: number, qStart:number = 0, rOffset:number = 0) {
    let hexas = [];
    for (let q = qStart; q < mapWidth; q++) {
      let offset = Math.floor(q/2) + rOffset; // or q>>1
      for (let r = -offset; r < mapHeight - offset; r++) {
        hexas.push(new Hex(q, r, -q-r));
      }
    }

    return hexas;
  }

}

export default GridGenerator