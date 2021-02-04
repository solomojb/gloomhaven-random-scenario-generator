import React, { useEffect, useState } from "react";
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
import { storeMapOffsetX, storeMapOffsetY, storeRotateHex } from "../../../State/State";

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

  useEffect(() => {
	  dispatch(storeMapOffsetX(dungeonData.offsetX));
	  dispatch(storeMapOffsetY(dungeonData.offsetY));
	  dispatch(storeRotateHex(dungeonData.rotateHex));
  }, [dungeonData]);

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
    <div style={{display: "flex", flexDirection:"column"}}>
		<DisplayToggle label="Edit Mode:" flag={ShowFlags.EditMode}/>
		{ (showFlags & ShowFlags.EditMode) > 0 && <MapEditor dungeonData={dungeonData}/>}
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
