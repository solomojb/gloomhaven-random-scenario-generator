import React from 'react';
import { Form } from 'semantic-ui-react';
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
	return <DungeonProvider monsterData={monsters} intitialDungeon={dungeon} roomNumber={roomNumber}>
			<FlagsProvider localKey="roomFlags" initialFlags={ShowFlags.ShowAllMap}>
				<Form>
					<Form.Group>
						<Form.Field>
							<Room/>
						</Form.Field>
					</Form.Group>
				</Form>
			</FlagsProvider>
		</DungeonProvider>
};

export default RoomContainer;
