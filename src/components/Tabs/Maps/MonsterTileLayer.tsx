import React from "react"
import { Hexagon, Text, Pattern} from "react-hexgrid"
import { OverlayTile } from "../../../Data";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import HexOverlay from "./HexOverlay";

type Props = {
}

const MonsterTileLayer = (props: Props) => {
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

      const patterns = [<Pattern id="natural-stone-1" link={game.getOverlayTokenPath("natural-stone-1", "corridors")} size={{x:6.3, y:5.410}}/>];

    return <HexOverlay hexes={hexes} className={"map-grid"} patterns={patterns}/>
}

export default MonsterTileLayer;