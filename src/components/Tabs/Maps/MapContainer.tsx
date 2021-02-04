import React, { useState } from "react";
import { DropdownProps } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import MonsterCard from "./MonsterCard";
import MonsterSelector from "./MonsterSelector";
import DisplayToggle from "./DisplayToggle";
import PlayerCount from "./PlayerCount";
import MapInfo from "./MapInfo";
import { ShowFlags } from "../../../State/ItemViewState";
import { getItemViewState } from "../../../State/Selectors";
import MapEditor from "./Editor/MapEditor";
import { useDispatch } from "react-redux";
import DungeonProvider from "./DungeonProvider"

const MapContainer = () => {
  const game = useGame();
  const dispatch = useDispatch();
  const { showFlags } = getItemViewState();

  const [selectedMap, setSelectedMap] = useState<string>(
    localStorage.getItem("currentMap") || game.getDungeonList()[0]
  );
  const [selectedMonster, setSelectedMonster] = useState<string>(
    localStorage.getItem("currentMonster") || game.getMonsterList()[0]
  );

  const dungeonData = game.getDungeonData(selectedMap);
  const monsterData = game.getMonsterData(selectedMonster);

  const onDungeonChange = (obj: any, e: DropdownProps): void => {
    setSelectedMap(e.value as string);
    localStorage.setItem("currentMap", e.value as string);
  };

  const onMonsterChange = (obj: any, e: DropdownProps): void => {
    setSelectedMonster(e.value as string);
    localStorage.setItem("currentMonster", e.value as string);
  };

  if (!dungeonData || !monsterData) {
	  return null;
  }

  return (
	  <DungeonProvider intitialDungeon={dungeonData}>
    <div style={{display: "flex", flexDirection:"column"}}>
		<DisplayToggle label="Edit Mode:" flag={ShowFlags.EditMode}/>
		{ (showFlags & ShowFlags.EditMode) > 0 && <MapEditor/>}
		  <div>
			<div style={{display: "flex", flexDirection:"row", maxWidth:"400px"}}>
				<label>Number of players:</label>
				<PlayerCount/>
			</div>
				<div className="map-container">
					<Map monsterData={monsterData} />
					<div style={{display: "flex", flexDirection:"column"}}>
						<div style={{display: "flex", flexDirection:"row"}}>
							<div>
								<MapSelector defaultMapName={selectedMap} onChange={onDungeonChange}/>
								<MapCard/>
							</div>
							<div>
								<MonsterSelector defaultMonsterName={selectedMonster} onChange={onMonsterChange}/>
								<MonsterCard data={monsterData} />
							</div>
						</div>
						<div>
							<MapInfo monsterData={monsterData}/>
						</div>
					</div>
				</div>
		</div>
    </div>
	</DungeonProvider>
  );
};

export default MapContainer;
