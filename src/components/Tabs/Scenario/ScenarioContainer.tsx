import React from "react";
import { Button, Form, Tab } from "semantic-ui-react";
import PlayerCountProvider from "../../Providers/PlayerCountProvider";
import { useScenario } from "../../Providers/ScenarioProvider";
import PlayerCount from "../Maps/PlayerCount";
import RoomContainer from "./RoomContainer";

const ScenarioContainer = () => {
    const { rooms, getNextRoom, resetScenario } = useScenario();
       const panes = [...Array(rooms.length)].map((_i, index) =>{
        return { menuItem: `${index + 1}`, render: () => <Tab.Pane><RoomContainer roomNumber={index}/></Tab.Pane> }
    });

    return (
        <PlayerCountProvider localKey="scenarioPlayers">
            <Button disabled={rooms.length>=1} onClick={() => getNextRoom("", -1)}>Start New Scenario</Button>
            <Button disabled={rooms.length == 0} onClick={() => resetScenario()}>Reset Scenario</Button>
            <PlayerCount/>
            <Tab panes={panes} defaultActiveIndex={0}/>
        </PlayerCountProvider>
    );
};

export default ScenarioContainer;
