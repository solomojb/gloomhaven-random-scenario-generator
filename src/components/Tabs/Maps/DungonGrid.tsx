import React from "react"
import { GridGenerator, Hex, Hexagon, Text} from "../../../hexgrid"
import { useDungeon } from "./DungeonProvider";
import HexPattern from "./Grids/HexPattern";
import HexOverlay from "./HexOverlay";

const DungeonGrid = () => {
    const { dungeon: {map: {rotateHex}}} = useDungeon();
    const buildHex = (hex: Hex) => {
        const { q, r, s = 0} = hex;
        return <Hexagon q={q} r={r} s={s} fill="earth-1">
          <Text>{`${q} ${r}`}</Text>
          </Hexagon>
      }

    let hexesList = [];
     if (rotateHex) {
       hexesList = GridGenerator.rectangle(8,5, 4, -5);
     }
     else {
      hexesList = GridGenerator.orientedRectangle(5,9, -4, 5);
     }


    const patterns:any[] = [<HexPattern id="earth-1" category="corridors" size={{x:6.3, y:5.410}}/>];
    
      return <HexOverlay hexes={hexesList.map(buildHex)} className='all-grid' patterns={patterns}/>
}

export default DungeonGrid;

