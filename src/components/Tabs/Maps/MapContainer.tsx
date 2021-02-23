import React, { useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import MapCard from "./MapCard";
import MonsterCard from "./MonsterCard";
import MonsterSelector from "./MonsterSelector";
import PlayerCount from "./PlayerCount";
import MapEditor from "./Editor/MapEditor";
import DungeonProvider from "./DungeonProvider"
import Room from "../../Room/Room";
import PlayerCountProvider from "../../Providers/PlayerCountProvider";
import FlagsProvider, { ShowFlags } from "../../Providers/FlagsProvider";

const MapContainer = () => {
  const game = useGame();

  const dungeonData = game.getDungeonData(localStorage.getItem("currentMap") || game.getDungeonList()[0]);
  const monsterData = game.getMonsterData(localStorage.getItem("currentMonster") || game.getMonsterList()[0]);

  if (!dungeonData || !monsterData) {
	  return null;
  }

  return (
	  <DungeonProvider intitialDungeon={dungeonData} monsterData={monsterData}>
		<FlagsProvider localKey="showFlags" initialFlags={ShowFlags.ShowAllMap}>
			<Form>
				<MapEditor/>
				<Form.Group>
					<Form.Field>
						<PlayerCountProvider localKey={"numberOfPlayers"}>
							<PlayerCount/>
								<Room/>
						</PlayerCountProvider>
					</Form.Field>
				</Form.Group>
			</Form>
		</FlagsProvider>
	</DungeonProvider>
  );
};

export default MapContainer;
