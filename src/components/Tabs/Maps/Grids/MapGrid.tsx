import React, { ReactNode } from "react"
import { Hexagon, Text} from "react-hexgrid"
import { useDungeon } from "../DungeonProvider"
import HexPattern from "./HexPattern";
import { getItemViewState } from "../../../../State/Selectors";
import { ShowFlags } from "../../../../State/ItemViewState";

const MapGrid = () => {
    const { dungeon: { map : { hexColumns} } } = useDungeon();
    const { showFlags } = getItemViewState();

    const buildHex = (q:number, r: number) => {
        return <Hexagon q={q} r={r} s={0} fill="wood-1">
          <Text>{`${q} ${r}`}</Text>
          </Hexagon>
      }

      let hexes: (ReactNode | ReactNode [])[]= [];
      const patterns =[];
  
      if ((showFlags & ShowFlags.Grid) > 0) {
        hexes = hexColumns.map(data => {
          const hexes = [];
          for (let r = data.minR; r <= data.maxR; r++) {
            hexes.push(buildHex(data.q, r));
          }
          return hexes;
        })
       patterns.push(<HexPattern id="wood-1" category="corridors" size={{x:6.3, y:5.410}}/>);
      }
    
      return { hexes, patterns};
}

export default MapGrid;

