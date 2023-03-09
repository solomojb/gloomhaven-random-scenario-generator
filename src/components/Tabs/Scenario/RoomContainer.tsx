import React from "react";
import { Form } from "semantic-ui-react";
import { useGame } from "../../Game/GameProvider";
import { useScenario } from "../../Providers/ScenarioProvider";
import Room from "../../Room/Room";
import DungeonProvider from "../Maps/DungeonProvider";

type Props = {
  roomNumber: number;
};

const RoomContainer = (props: Props) => {
  const { roomNumber } = props;
  const game = useGame();
  const {
    scenarioData: { rooms },
    isDoorShown,
  } = useScenario();
  if (roomNumber >= rooms.length) {
    return null;
  }
  const { dungeonName, monsterName } = rooms[roomNumber];
  if (!dungeonName || !monsterName) {
    return null;
  }

  const dungeon = game.getDungeonData(dungeonName);
  const monsters = game.getMonsterData(monsterName);
  if (!dungeon || !monsters) {
    return null;
  }
  const visibleDoorCount = dungeon.exits.filter(({ aOrB }) =>
    isDoorShown(aOrB, roomNumber, "Exit")
  ).length;

  let exitStr: string = "";
  if (visibleDoorCount > 0) {
    if (visibleDoorCount > 1) {
      exitStr = "Click on an Exit to go to the next room";
    } else {
      exitStr = "Click on the Exit to go to the next room";
    }
  }
  return (
    <DungeonProvider
      monsterData={monsters}
      intitialDungeon={dungeon}
      roomNumber={roomNumber}
    >
      <Form.Group>
        {roomNumber > 1 && (
          <label>Click on an entrance to go to the previous room</label>
        )}
        <label>{exitStr}</label>
      </Form.Group>
      <Room />
    </DungeonProvider>
  );
};

export default RoomContainer;
