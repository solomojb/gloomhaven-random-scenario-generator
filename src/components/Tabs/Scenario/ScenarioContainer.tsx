import React from "react";
import { Button, Tab } from "semantic-ui-react";
import PlayerCountProvider from "../../Providers/PlayerCountProvider";
import { useScenario } from "../../Providers/ScenarioProvider";
import PlayerCount from "../Maps/PlayerCount";
import RoomContainer from "./RoomContainer";

const ScenarioContainer = () => {
    const { rooms, getNextRoom } = useScenario();
       const panes = [...Array(rooms.length)].map((_i, index) =>{
        return { menuItem: `${index + 1}`, render: () => <Tab.Pane><RoomContainer roomNumber={index}/></Tab.Pane> }
    });

    return (
        <PlayerCountProvider localKey="scenarioPlayers">
            <Button disabled={rooms.length>=3} onClick={() => getNextRoom()}>Start New Scenario</Button>
            <PlayerCount/>
            <Tab panes={panes} defaultActiveIndex={0}/>
        </PlayerCountProvider>
    );
};

export default ScenarioContainer;
