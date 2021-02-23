import React from "react"
import { Hexagon, Text } from "../../react-hexgrid";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexPattern from "./HexPattern";

const DungeonGrid = () => {
    const { dungeon: {map: {rotateHex}}} = useDungeon();
    const { isFlagSet } = useFlags();
    
    const buildHex = (q:number, r: number) => {
        return <Hexagon q={q} r={r} s={0} fill="earth-1">
          <Text>{`${q} ${r}`}</Text>
          </Hexagon>
      }

    const hexes = [];
    const patterns =[];

    if (isFlagSet(ShowFlags.AllGrid)) {
        if (rotateHex) {
            let maxQ = 6;
            let minQ = -1;
            for (let r = -5; r <= 4; r++) {
                for (let q = minQ; q <= maxQ; q++) {
                    hexes.push(buildHex(q, r));
                }
                if (r%2 === 0){
                    minQ -=1;
                } else {
                    maxQ -=1;
                }
            }
        }
        else {
            let maxR = 6;
            let minR = -3;
            for (let q = -4; q <= 4; q++) {
                for (let r = minR; r <= maxR; r++) {
                    hexes.push(buildHex(q, r));
                }
                if (q%2 === 0){
                    minR -=1;
                } else {
                    maxR -=1;
                }
            }
        }

        patterns.push(<HexPattern id="earth-1" category="corridors" rotate={rotateHex}/>);
    }
    
    return { hexes, patterns}
}

export default DungeonGrid;

