import React, { useEffect, useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import { useDispatch } from "react-redux";
import { storeShowGrid } from "../../../State/State";
import { getItemViewState } from "../../../State/Selectors";
import MonsterCard from "./MonsterCard";
import MonsterSelector from "./MonsterSelector";
import Tumblers from "./Tumblers";
import { Tile } from "../../../State/MapData";

const MapContainer = () => {
  const game = useGame();
  const [selectedMap, setSelectedMap] = useState<string>(
    localStorage.getItem("currentMap") || game.getDungeonList()[0]
  );
  const [selectedMonster, setSelectedMonster] = useState<string>(
    localStorage.getItem("currentMonster") || game.getMonsterList()[0]
  );
  const dungeonData = game.getDungeonData(selectedMap);
  const monsterData = game.getMonsterData(selectedMonster);
  const { showGrid } = getItemViewState();
  const dispatch = useDispatch();
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
		<div style={{display: "flex", flexDirection:"row"}}>
			<label>Show Grid:</label>
			<Form.Checkbox
				toggle
				checked={showGrid}
				onClick={() => {
					dispatch(storeShowGrid(!showGrid));
				}}
			/>
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
      	<div>
			<div className="map-container">
				<Map dungeonData={dungeonData} monsterData={monsterData} />
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
			</div>
      	</div>
    </div>
  );
};

export default MapContainer;
