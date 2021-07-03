import React, { ReactNode } from "react"
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import { ShowFlags, useFlags } from "../Providers/FlagsProvider";
import { GridTile } from "./GridTile";
import { useLayout } from "../../react-hexgrid";

const SpawnPointsLayer = () => {
    const { dungeon: {spawnPoints}} = useDungeon();
    const { isFlagSet } = useFlags();
    const { size} = useLayout();

    const buildHex = (spawnPoint:OverlayTile) => {
        const { q, r, id} = spawnPoint;
        return <GridTile q={q} r={r} id="natural-stone-1" category="corridors">
          <div style={{fontSize:size.x/2, position:"absolute"}}>{`${id}`}</div>
        </GridTile>
     }

    return isFlagSet(ShowFlags.SpawnPoint) ? spawnPoints.map(buildHex): undefined;
}

export default SpawnPointsLayer;