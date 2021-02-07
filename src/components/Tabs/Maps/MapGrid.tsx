import React from "react"
import { Hexagon, Text, Pattern} from "react-hexgrid"
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider"
import HexOverlay from "./HexOverlay";

type Props = {

}

const MapGrid = (props: Props) => {
    const { dungeon: { map : { hexColumns} } } = useDungeon();
    const game = useGame();
    const buildHex = (q:number, r: number) => {
        return <Hexagon q={q} r={r} fill="wood-1">
          <Text>{`${q} ${r}`}</Text>
          </Hexagon>
      }
   
      const hexes = hexColumns.map(data => {
        const hexes = [];
        for (let r = data.minR; r <= data.maxR; r++) {
          hexes.push(buildHex(data.q, r));
        }
        return hexes;
      })

    const patterns = [<Pattern id="wood-1" link={game.getOverlayTokenPath("wood-1", "corridors")} size={{x:6.3, y:5.410}}/>];
    
      return <HexOverlay hexes={hexes} className='map-grid' patterns={patterns}/>
}

export default MapGrid;

