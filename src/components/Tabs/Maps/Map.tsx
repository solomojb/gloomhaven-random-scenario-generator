import React from "react";
import { MapData } from "../../../State/MapData";
import { useGame } from "../../Game/GameProvider";
import MapSpawnPoint from "./MapSpawnPoint";
import "./map.css"

type Props = {
  data: MapData;
};

const Map = (props: Props) => {
  const { data: { tile, spawnPoints, offset} } = props;
  const game = useGame();

  return (
    <div className="map">
        <img src={game.getMapPath(tile)}/>
        { spawnPoints.map( spawnPoint => {
            return <MapSpawnPoint spawnPoint={spawnPoint} offset={offset}/>
        })}
    </div>
  );
};

export default Map;
