import React, { ReactNode } from "react"
import { Hexagon, Text} from "../../react-hexgrid"
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { useDungeon } from "../Tabs/Maps/DungeonProvider"
import HexPattern from "./HexPattern";

const MapGrid = () => {
    const { dungeon: { map : { hexColumns, rotateHex} } } = useDungeon();
    const { isFlagSet } = useFlags();

    const buildHex = (q:number, r: number) => {
        return <Hexagon q={q} r={r} s={0} fill="wood-1">
          <Text>{`${q} ${r}`}</Text>
          </Hexagon>
      }

      let hexes: (ReactNode | ReactNode [])[]= [];
      const patterns =[];
  
      if (isFlagSet(ShowFlags.Grid)) {
        hexes = hexColumns.map(data => {
          const hexes = [];
          for (let r = data.minR; r <= data.maxR; r++) {
            hexes.push(buildHex(data.q, r));
          }
          return hexes;
        })
       patterns.push(<HexPattern id="wood-1" category="corridors" rotate={rotateHex}/>);
      }
    
      return { hexes, patterns};
}

export default MapGrid;

