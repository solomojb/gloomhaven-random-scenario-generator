import React, { ReactNode } from "react"
import { useLayout } from "../../react-hexgrid";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { useDungeon } from "../Tabs/Maps/DungeonProvider"
import { GridTile } from "./GridTile";

const MapGrid = () => {
    const { dungeon: { map : { hexColumns} } } = useDungeon();
    const { isFlagSet } = useFlags();
    const { size } = useLayout();

    const buildHex = (q:number, r: number) => {
        return <GridTile q={q} r={r} id="wood-1" category="corridors">
          <div style={{fontSize:size.x/2, position:"absolute"}}>{`${q},${r}`}</div>
        </GridTile>
      }

      let hexes: (ReactNode | ReactNode [])[]= [];
      if (isFlagSet(ShowFlags.Grid)) {
        hexColumns.forEach((data:HexColumn) => {
          for (let r = data.minR; r <= data.maxR; r++) {
            hexes.push(buildHex(data.q, r));
          }
        })
      }
    
      return hexes;
}

export default MapGrid;

