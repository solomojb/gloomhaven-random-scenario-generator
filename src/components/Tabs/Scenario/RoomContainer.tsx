import React from 'react';
import { useGame } from '../../Game/GameProvider';
import FlagsProvider, { ShowFlags } from '../../Providers/FlagsProvider';
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
				<FlagsProvider localKey="roomFlags" initialFlags={ShowFlags.ShowAllMap}>
				<Room/>
				</FlagsProvider>
		</DungeonProvider>
};

export default RoomContainer;
