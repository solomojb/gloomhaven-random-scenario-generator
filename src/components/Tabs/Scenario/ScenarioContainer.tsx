import React from "react";
import { Button, Form, Tab } from "semantic-ui-react";
import { ShowFlags } from '../../Providers/FlagsProvider';
import PlayerCountProvider from "../../Providers/PlayerCountProvider";
import { useScenario } from "../../Providers/ScenarioProvider";
import DisplayToggle from "../Maps/DisplayToggle";
import PlayerCount from "../Maps/PlayerCount";
import Difficulty from "./Difficulty";
import RoomContainer from "./RoomContainer";

const ScenarioContainer = () => {
    const { rooms, getNextRoom, resetScenario, activeRoomNumber,setActiveRoomNumber } = useScenario();
       const panes = [...Array(rooms.length)].map((_i, index) =>{
        return { menuItem: `${index + 1}`, render: () => <Tab.Pane><RoomContainer roomNumber={index}/></Tab.Pane> }
    });
    
    return (
        <PlayerCountProvider localKey="scenarioPlayers">
            <Button disabled={rooms.length>=1} onClick={() => getNextRoom("", -1)}>Start New Scenario</Button>
            <Button disabled={rooms.length == 0} onClick={() => resetScenario()}>Reset Scenario</Button>
            <Difficulty/>
            <Form>
                <PlayerCount/>
            </Form>
            <DisplayToggle flag={ShowFlags.AddForgottenCircles} label={"Include Forgotten Circles"}/>
            <Tab panes={panes} onTabChange={(_e, data) => {setActiveRoomNumber(data.activeIndex as number)}} defaultActiveIndex={0} activeIndex={activeRoomNumber}/>
        </PlayerCountProvider>
    );
};

export default ScenarioContainer;
