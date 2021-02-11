import React from "react"
import { Hexagon, Text} from "../../../react-hexgrid"
import { OverlayTile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import HexPattern from "./Grids/HexPattern";
import HexOverlay from "./HexOverlay";

type Props = {
}

const MapSpawnPointsLayer = (props: Props) => {
    const game = useGame();
    const { dungeon: {spawnPoints}} = useDungeon();

    const buildHex = (spawnPoint:OverlayTile) => {
        const { q, r, id} = spawnPoint;
        return <Hexagon q={q} r={r} fill={"natural-stone-1"}>
            <Text>{id}</Text>
            </Hexagon>
     }

     const hexes = spawnPoints.map(spawnPoint => {
        const hexes = [];
          hexes.push(buildHex(spawnPoint));
        return hexes;
      })

      function onlyUnique(value:any, index: any, self: any) {
        return self.indexOf(value) === index;
      }

      const patterns = [<HexPattern id="natural-stone-1" category="corridors" size={{x:6.3, y:5.410}}/>];

    return <HexOverlay hexes={hexes} className={"map-grid"} patterns={patterns}/>
}

export default MapSpawnPointsLayer;