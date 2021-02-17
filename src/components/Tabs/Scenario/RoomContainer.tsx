import React from 'react';
import { useGame } from '../../Game/GameProvider';
import FlagsProvider, { ShowFlags } from '../../Providers/FlagsProvider';
import { useScenario } from '../../Providers/ScenarioProvider';
import Room from "../../Room/Room";
import DungeonProvider from '../Maps/DungeonProvider';

type Props = {
	roomNumber: number;
}

const RoomContainer = (props: Props) => {
	const { roomNumber } = props;
	const { rooms } = useScenario();
	if (roomNumber >= rooms.length) {
		return null;
	}
	const { dungeon, monsters} = rooms[roomNumber];
	if (!dungeon || !monsters) {
		return null;
	}
	return <DungeonProvider monsterData={monsters} intitialDungeon={dungeon}>
				<FlagsProvider localKey="roomFlags" initialFlags={ShowFlags.ShowAllMap}>
				<Room/>
				</FlagsProvider>
		</DungeonProvider>
};

export default RoomContainer;
