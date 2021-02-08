import React from "react"
import { Hexagon} from "react-hexgrid"
import { OverlayTile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "./Grids/HexPattern";
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
        const { q, r, pattern, rotation} = tile;
        const fillName = pattern + (rotation ? rotation : '');
        return <Hexagon q={q} r={r} fill={fillName}/>
     }
   
      const hexes = tiles.map(tile => {
        const hexes = [];
          hexes.push(buildHex(tile));
        return hexes;
      })

      function onlyUnique(value:any, index: any, self: any) {
        return self.indexOf(value) === index;
      }

      const patternStrings = tiles.map( tile => {return {pattern: tile.pattern, rotation: tile.rotation}}).filter(onlyUnique);
      const patterns = patternStrings.map( tile => <HexPattern id={tile.pattern} category={overlayType} rotation={tile.rotation} size={{x:6.3, y:5.410}}/>)

    return <HexOverlay hexes={hexes} className={"map-grid"} patterns={patterns}/>
}

export default MapOverlayTileLayer;