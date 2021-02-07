import React from "react"
import { Hexagon, Pattern} from "react-hexgrid"
import { OverlayTile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import HexOverlay from "./HexOverlay";

type Props = {
    tiles: OverlayTile[];
    overlayType: string;
}

const MapOverlayTileLayer = (props: Props) => {
    const { tiles, overlayType  } = props;
    const game = useGame();
    const { dungeon: {map: {rotateHex}}} = useDungeon();

    if (!tiles) {
        return null;
    }

    const buildHex = (tile:OverlayTile) => {
        const { q, r, pattern} = tile;
        return <Hexagon q={q} r={r} fill={pattern}/>
     }
   
      const hexes = tiles.map(tile => {
        const hexes = [];
          hexes.push(buildHex(tile));
        return hexes;
      })

      function onlyUnique(value:any, index: any, self: any) {
        return self.indexOf(value) === index;
      }

      const patternStrings = tiles.map( tile => tile.pattern).filter(onlyUnique);
      const patterns = patternStrings.map( pattern => <Pattern id={pattern} link={game.getOverlayTokenPath(pattern, overlayType)} size={{x:6.3, y:5.410}}/>)

    return <HexOverlay hexes={hexes} className={"map-grid"} patterns={patterns}/>
}

export default MapOverlayTileLayer;