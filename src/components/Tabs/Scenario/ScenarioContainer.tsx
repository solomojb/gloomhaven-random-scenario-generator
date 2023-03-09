import React from "react";
import { Button, Form, Label, Message, Tab } from "semantic-ui-react";
import { GameType } from "../../Game/GameType";
import PlayerCountProvider from "../../Providers/PlayerCountProvider";
import { useScenario } from "../../Providers/ScenarioProvider";
import PlayerCount from "../Maps/PlayerCount";
import RoomContainer from "./RoomContainer";

const ScenarioContainer = () => {
    const { scenarioData:{rooms, gamesIncluded, infiniteRooms}, roomsAvailable, getNextRoom, resetScenario, activeRoomNumber,setActiveRoomNumber, toggleInfiniteRooms, toggleGameIncluded } = useScenario();
       const panes = [...Array(rooms.length)].map((_i, index) =>{
        return { menuItem: `${index + 1}`, render: () => <Tab.Pane><RoomContainer roomNumber={index}/></Tab.Pane> }
    });
    return (
        <PlayerCountProvider localKey="scenarioPlayers">
            <Form>
                <Form.Group>
                    {!roomsAvailable && <Message negative>You must have some dungeons available. Please make sure a game with rooms is selected.</Message>}
                    </Form.Group>
                <Form.Group>
                    <Button disabled={!roomsAvailable || rooms.length>=1} onClick={() => {getNextRoom("", -1)}}>Start New Scenario</Button>
                    <Button disabled={rooms.length == 0} onClick={() => resetScenario()}>Reset Scenario</Button>
                 </Form.Group>
                <PlayerCount/>
                <Form.Group inline>
                    <label>Games:</label>
            {Object.entries(GameType).map(([key, value]) => (
                    <Form.Checkbox
                            label={key}
                            disabled={rooms.length >= 1}
                            checked={gamesIncluded && gamesIncluded.includes(value)}
                            onChange={() =>
                                toggleGameIncluded(value)
                            }
                            />
                            ))}
                            </Form.Group>
            <Form.Group inline>
            <label>Options:</label>
                <Form.Checkbox
                        label={"Infinite Rooms"}
                        disabled={rooms.length >= 1}
                        checked={infiniteRooms}
                        onChange={() =>
                            toggleInfiniteRooms()
                        }
                        />
            </Form.Group>
                        </Form>
            <Tab panes={panes} onTabChange={(_e, data) => {setActiveRoomNumber(data.activeIndex as number)}} activeIndex={activeRoomNumber}/>
        </PlayerCountProvider>
    );
};

export default ScenarioContainer;
