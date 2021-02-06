import React, { useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import MonsterCard from "./MonsterCard";
import MonsterSelector from "./MonsterSelector";
import PlayerCount from "./PlayerCount";
import MapInfo from "./MapInfo";
import MapEditor from "./Editor/MapEditor";
import DungeonProvider from "./DungeonProvider"

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
		<Form>
			<MapEditor/>
			<Form.Group>
				<Form.Field>
					<PlayerCount/>
					<Map monsterData={monsterData} />
					<MapInfo monsterData={monsterData}/>
				</Form.Field>
				<Form.Group>
					<Form.Field>
						<MapSelector defaultMapName={selectedMap} onChange={onDungeonChange}/>
						<MapCard/>
						<MonsterSelector defaultMonsterName={selectedMonster} onChange={onMonsterChange}/>
						<MonsterCard data={monsterData} />
					</Form.Field>
				</Form.Group>
			</Form.Group>
		</Form>
	</DungeonProvider>
  );
};

export default MapContainer;
