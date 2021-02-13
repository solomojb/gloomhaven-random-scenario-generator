import React, { ReactNode } from "react"
import { Hexagon, Text} from "react-hexgrid"
import { OverlayTile } from "../../../../Data";
import { useDungeon } from "../DungeonProvider";
import HexPattern from "./HexPattern";
import { getItemViewState } from "../../../../State/Selectors";
import { ShowFlags } from "../../../../State/ItemViewState";

const SpawnPointsLayer = () => {
    const { dungeon: {spawnPoints}} = useDungeon();
    const { showFlags } = getItemViewState();

    const buildHex = (spawnPoint:OverlayTile) => {
        const { q, r, id} = spawnPoint;
        return <Hexagon q={q} r={r} s={0} fill={"natural-stone-1"}>
            <Text>{id}</Text>
            </Hexagon>
     }

     let hexes: (ReactNode | ReactNode [])[]= [];
     const patterns =[];
 
     if ((showFlags & ShowFlags.SpawnPoint) > 0) {
      hexes = spawnPoints.map(spawnPoint => {
          const hexes = [];
            hexes.push(buildHex(spawnPoint));
          return hexes;
        })

      patterns.push(<HexPattern id="natural-stone-1" category="corridors" size={{x:6.3, y:5.410}}/>);
     }

    return { hexes, patterns};
}

export default SpawnPointsLayer;