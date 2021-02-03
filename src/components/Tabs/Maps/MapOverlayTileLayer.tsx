import React from "react"
import { OverlayTile } from "../../../State/MapData"
import { useGame } from "../../Game/GameProvider";
import MapSpawnPoint from "./MapSpawnPoint";

type Props = {
    tiles: OverlayTile[];
    offsetX: number;
    offsetY: number;
    rotateHex: boolean;
    overlayType: string;
}

const MapOverlayTileLayer = (props: Props) => {
    const { tiles, rotateHex, offsetX, offsetY, overlayType  } = props;
    const game = useGame();

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
            console.log(type, transform)
            return <MapSpawnPoint rotateHex={rotateHex} row={row} column={column} offsetX={offsetX} offsetY={offsetY}>
                    <img style={{transformOrigin: "center", transform }}src={game.getOverlayTokenPath(type,overlayType)}/>
                </MapSpawnPoint>

        })}
        </>
    );
}

export default MapOverlayTileLayer;