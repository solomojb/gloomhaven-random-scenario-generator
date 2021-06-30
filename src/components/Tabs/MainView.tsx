import React from 'react';
import { Tab } from 'semantic-ui-react';
import FlagsProvider, { ShowFlags } from '../Providers/FlagsProvider';
import ScenarioProvider from '../Providers/ScenarioProvider';
import MapContainer from './Maps/MapContainer';
import ScenarioContainer from './Scenario/ScenarioContainer';

const MainView = () => {

    // Fix terrain not spawning right
    // Fix difficult terrain not showing in map info. 
    // Encampment logs are off
    // Hovel Table is Off
    // Library Tables Are off
    // Store last viewed tab
    // Store state of dungeon
    // Add Damage Icon
    // Make trap icons a bit smaller
    // Make text be on invisble hex one to the right

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
    
    return (
        <>
            <Tab panes={panes} defaultActiveIndex={0}/>
            <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
        </>
    );

}

export default MainView;
