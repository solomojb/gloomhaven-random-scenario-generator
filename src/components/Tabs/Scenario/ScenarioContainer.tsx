import React from "react";
import { Button, Form, Tab } from "semantic-ui-react";
import { ShowFlags, useFlags } from '../../Providers/FlagsProvider';
import PlayerCountProvider from "../../Providers/PlayerCountProvider";
import { useScenario } from "../../Providers/ScenarioProvider";
import DisplayToggle from "../Maps/DisplayToggle";
import PlayerCount from "../Maps/PlayerCount";
import RoomContainer from "./RoomContainer";

const ScenarioContainer = () => {
    const { scenarioData:{rooms}, getNextRoom, resetScenario, activeRoomNumber,setActiveRoomNumber, setInfiniteRooms } = useScenario();
       const panes = [...Array(rooms.length)].map((_i, index) =>{
        return { menuItem: `${index + 1}`, render: () => <Tab.Pane><RoomContainer roomNumber={index}/></Tab.Pane> }
    });
      const { isFlagSet } = useFlags();

    
    return (
        <PlayerCountProvider localKey="scenarioPlayers">
            <Button disabled={rooms.length>=1} onClick={() => {getNextRoom("", -1); setInfiniteRooms(isFlagSet(ShowFlags.InfiniteRooms))}}>Start New Scenario</Button>
            <Button disabled={rooms.length == 0} onClick={() => resetScenario()}>Reset Scenario</Button>
            <Form>
                <PlayerCount/>
            </Form>
            <DisplayToggle flag={ShowFlags.AddForgottenCircles} label={"Include Forgotten Circles"}/>
            <DisplayToggle flag={ShowFlags.InfiniteRooms} label={"Infinite Rooms"}/>
            <Tab panes={panes} onTabChange={(_e, data) => {setActiveRoomNumber(data.activeIndex as number)}} activeIndex={activeRoomNumber}/>
        </PlayerCountProvider>
    );
};

export default ScenarioContainer;
