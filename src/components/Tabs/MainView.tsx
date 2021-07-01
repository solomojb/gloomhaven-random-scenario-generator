import React, { useState } from 'react';
import { Tab, TabProps } from 'semantic-ui-react';
import FlagsProvider, { ShowFlags } from '../Providers/FlagsProvider';
import ScenarioProvider from '../Providers/ScenarioProvider';
import MapContainer from './Maps/MapContainer';
import ScenarioContainer from './Scenario/ScenarioContainer';

const MainView = () => {
    const [ currentTab, setCurrentTab] = useState<number>(parseFloat((localStorage.getItem("lastTab") as string|| "0")));

    // Fix terrain not spawning right
        // Encampment logs are off
        // Hovel Table is Off
        // Library Tables Are off
    // Store state of dungeon
    // Add Damage Icon
    // Make trap icons a bit smaller
    // Add edit flag?

    let panes = [
        { menuItem: 'Scenario', render: () => <Tab.Pane>
            <FlagsProvider localKey="roomFlags" initialFlags={ShowFlags.ShowAllMap}>
                <ScenarioProvider>
                    <ScenarioContainer/>
                </ScenarioProvider>
            </FlagsProvider>
        </Tab.Pane> },
        { menuItem: 'Map', render: () => <Tab.Pane><MapContainer/></Tab.Pane> },
    ];


    const onTabChange = (obj:any, data:TabProps):void => {
        setCurrentTab(data.activeIndex as number);
        localStorage.setItem("lastTab", data.activeIndex as string);
    }

    
    return (
        <>
            <Tab panes={panes} activeIndex={currentTab} onTabChange={onTabChange}/>
            <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
        </>
    );

}

export default MainView;
