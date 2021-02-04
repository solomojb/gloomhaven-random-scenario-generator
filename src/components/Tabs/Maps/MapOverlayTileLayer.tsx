import React from "react"
import { OverlayTile } from "../../../State/MapData"
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import MapSpawnPoint from "./MapSpawnPoint";

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

    return (<>
        {tiles.map( tile => {
            const { type, row, column, scale = 1, rotation = 0 } = tile;
            const modifiedRotation = rotation + (rotateHex ? 90 : 0);
            const rotationStyle = modifiedRotation ? `rotate(${modifiedRotation}deg)`: '';
            const scaleStyle = scale != 1 ? `scale(${scale})` : ''; 
            const transform = rotationStyle + ' ' + scaleStyle;
            return <MapSpawnPoint row={row} column={column}>
                    <img style={{transformOrigin: "center", transform }}src={game.getOverlayTokenPath(type,overlayType)}/>
                </MapSpawnPoint>

        })}
        </>
    );
}

export default MapOverlayTileLayer;