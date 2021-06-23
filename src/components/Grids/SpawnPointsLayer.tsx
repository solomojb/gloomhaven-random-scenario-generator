import React, { ReactNode } from "react"
import { Hexagon, Text} from "../../react-hexgrid"
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexPattern from "./HexPattern";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";

const SpawnPointsLayer = () => {
    const { dungeon: {spawnPoints}} = useDungeon();
    const { isFlagSet } = useFlags();

    const buildHex = (spawnPoint:OverlayTile) => {
        const { q, r, id} = spawnPoint;
        return <Hexagon q={q} r={r} s={0} fill={"natural-stone-1"}>
            <Text>{id}</Text>
            </Hexagon>
     }

     let hexes: (ReactNode | ReactNode [])[]= [];
     const patterns =[];
 
     if (isFlagSet(ShowFlags.SpawnPoint)) {
      hexes = spawnPoints.map(buildHex);

      patterns.push(<HexPattern id="natural-stone-1" category="corridors"/>);
     }

    return { hexes, patterns};
}

export default SpawnPointsLayer;