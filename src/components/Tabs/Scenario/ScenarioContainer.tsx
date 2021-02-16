import React from "react";
import { Tab } from "semantic-ui-react";
import PlayerCount from "../Maps/PlayerCount";
import RoomContainer from "./RoomContainer";

const ScenarioContainer = () => {
    let panes = [
        { menuItem: '1', render: () => <Tab.Pane><RoomContainer monstersName="cutthroat" dungeonName="alcove"/></Tab.Pane> },
        { menuItem: '2', render: () => <Tab.Pane><RoomContainer monstersName="archaic" dungeonName="altar"/></Tab.Pane> },
        { menuItem: '3', render: () => <Tab.Pane><RoomContainer monstersName="crushing" dungeonName="armory"/></Tab.Pane> },
    ];
    
    return (
        <>
			<PlayerCount/>
            <Tab panes={panes} defaultActiveIndex={0}/>
        </>
    );
};

export default ScenarioContainer;
