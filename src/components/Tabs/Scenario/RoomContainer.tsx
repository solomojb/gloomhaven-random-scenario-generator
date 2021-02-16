import React from 'react';
import { useGame } from '../../Game/GameProvider';
import Room from "../../Room/Room";
import DungeonProvider from '../Maps/DungeonProvider';

type Props = {
	dungeonName: string;
	monstersName: string;
}

const RoomContainer = (props: Props) => {
	const { dungeonName, monstersName} = props;
	const game = useGame();
	const dungeon = game.getDungeonData(dungeonName);
	const monsters = game.getMonsterData(monstersName);
	return <DungeonProvider monsterData={monsters} intitialDungeon={dungeon}>
			<Room/>
		</DungeonProvider>
};

export default RoomContainer;
