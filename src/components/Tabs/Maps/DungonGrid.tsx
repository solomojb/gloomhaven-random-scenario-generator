import React from "react"
import { Hexagon, Text, Pattern} from "react-hexgrid"
import { useGame } from "../../Game/GameProvider";
import HexOverlay from "./HexOverlay";

const DungeonGrid = () => {
    const game = useGame();
    const buildHex = (q:number, r: number) => {
        return <Hexagon q={q} r={r} fill="earth-1">
          <Text>{`${q} ${r}`}</Text>
          </Hexagon>
      }
    const hexes = [];
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

    const patterns = [<Pattern id="earth-1" link={game.getOverlayTokenPath("earth-1", "corridors")} size={{x:6.3, y:5.410}}/>];
    
      return <HexOverlay hexes={hexes} className='all-grid' patterns={patterns}/>
}

export default DungeonGrid;

