import React from 'react';
import { useGame } from '../../Game/GameProvider';
import { useScenario } from '../../Providers/ScenarioProvider';
import Room from "../../Room/Room";
import DungeonProvider from '../Maps/DungeonProvider';

type Props = {
	roomNumber: number;
}

const RoomContainer = (props: Props) => {
	const { roomNumber } = props;
	const game = useGame();
    const { scenarioData:{rooms}} = useScenario();
	if (roomNumber >= rooms.length) {
		return null;
	}
	const { dungeonName, monsterName} = rooms[roomNumber];
	if (!dungeonName || !monsterName) {
		return null;
	}

	const dungeon = game.getDungeonData(dungeonName);
	const monsters = game.getMonsterData(monsterName);
	if (!dungeon || !monsters) {
		return null;
	}
	return <DungeonProvider monsterData={monsters} intitialDungeon={dungeon} roomNumber={roomNumber}>
			<Room/>
		</DungeonProvider>
};

export default RoomContainer;
