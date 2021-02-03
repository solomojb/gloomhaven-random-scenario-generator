import React, { useEffect, useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import MonsterCard from "./MonsterCard";
import MonsterSelector from "./MonsterSelector";
import Tumblers from "./Tumblers";
import DisplayToggle from "./DisplayToggle";
import { Tile } from "../../../State/MapData";
import PlayerCount from "./PlayerCount";
import MapInfo from "./MapInfo";
import { ShowFlags } from "../../../State/ItemViewState";
import { getItemViewState } from "../../../State/Selectors";

const MapContainer = () => {
  const game = useGame();
  const { showFlags } = getItemViewState();
  const [selectedMap, setSelectedMap] = useState<string>(
    localStorage.getItem("currentMap") || game.getDungeonList()[0]
  );
  const [selectedMonster, setSelectedMonster] = useState<string>(
    localStorage.getItem("currentMonster") || game.getMonsterList()[0]
  );
  const dungeonData = game.getDungeonData(selectedMap);
  const monsterData = game.getMonsterData(selectedMonster);
  const [mapScale, setMapScale] = useState<number[]>(dungeonData.tiles.map(tile => tile.scale));
  const [offsetX, setOffsetX] = useState<number>(
    (dungeonData && dungeonData.offsetX) || 1
  );
  const [offsetY, setOffsetY] = useState<number>(
    (dungeonData && dungeonData.offsetY) || 1
  );

  const onDungeonChange = (obj: any, e: DropdownProps): void => {
    setSelectedMap(e.value as string);
    localStorage.setItem("currentMap", e.value as string);
  };

  const onMonsterChange = (obj: any, e: DropdownProps): void => {
    setSelectedMonster(e.value as string);
    localStorage.setItem("currentMonster", e.value as string);
  };

  useEffect(() => {
    if (!dungeonData) {
      return;
    }
    const scales = dungeonData.tiles.map(tile => tile.scale);
    setMapScale(scales);
    setOffsetX(dungeonData.offsetX);
    setOffsetY(dungeonData.offsetY);
  }, [dungeonData]);

  return (
    <div style={{display: "flex", flexDirection:"column"}}>
		<DisplayToggle label="Edit Mode:" flag={ShowFlags.EditMode}/>
		{ (showFlags & ShowFlags.EditMode) > 0 && 
		<div style={{display: "flex", flexDirection:"column"}}>
			<div style={{display: "flex", flexDirection:"row"}}>
				<DisplayToggle label="Grid:" flag={ShowFlags.Grid}/>
				<DisplayToggle label="Spawn Points:" flag={ShowFlags.SpawnPoint}/>
				<DisplayToggle label="Obstacles:" flag={ShowFlags.Obstacles}/>
				<DisplayToggle label="Corridors:" flag={ShowFlags.Corridors}/>
				<DisplayToggle label="Spawns:" flag={ShowFlags.Spawns}/>
			</div>
			<div style={{display: "flex", flexDirection:"row"}}>
				<div>
					{dungeonData.tiles.map( (tile:Tile, tileIndex:number) => {
							return <Tumblers
							label={`Map ${tile.tile} Scale:`}
							value={mapScale[tileIndex]}
							step={0.01}
							onChange={(value: number) => {
								const newMap: number[] = Object.assign([], mapScale);
								newMap[tileIndex] = value;
								setMapScale(newMap);
								dungeonData.tiles[tileIndex].scale = value;
							}}
						/>
					})}
				</div>
				<div>
					<Tumblers
						label="Map OffsetX:"
						value={offsetX}
						step={1}
						onChange={(value: number) => {
							setOffsetX(value);
							dungeonData.offsetX = value;
						}}
					/>
					<Tumblers
						label="Map OffsetY:"
						value={offsetY}
						step={1}
						onChange={(value: number) => {
							setOffsetY(value);
							dungeonData.offsetY = value;
						}}
					/>
				</div>
			</div>
		</div>
		}
		  <div>
			<div style={{display: "flex", flexDirection:"row", maxWidth:"400px"}}>
				<label>Number of players:</label>
				<PlayerCount/>
			</div>
			<div className="map-container">
				<Map dungeonData={dungeonData} monsterData={monsterData} />
				<div style={{display: "flex", flexDirection:"column"}}>
					<div style={{display: "flex", flexDirection:"row"}}>
						<div>
							<MapSelector defaultMapName={selectedMap} onChange={onDungeonChange}/>
							<MapCard data={dungeonData} />
						</div>
						<div>
							<MonsterSelector defaultMonsterName={selectedMonster} onChange={onMonsterChange}/>
							<MonsterCard data={monsterData} />
						</div>
					</div>
					<div>
						<MapInfo monsterData={monsterData} mapData={dungeonData}/>
					</div>
				</div>
			</div>
      	</div>
    </div>
  );
};

export default MapContainer;
