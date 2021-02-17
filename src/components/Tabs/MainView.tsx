import React from 'react';
import { Tab } from 'semantic-ui-react';
import ScenarioProvider from '../Providers/ScenarioProvider';
import MapContainer from './Maps/MapContainer';
import ScenarioContainer from './Scenario/ScenarioContainer';

const MainView = () => {

    let panes = [
        { menuItem: 'Scenario', render: () => <Tab.Pane><ScenarioProvider><ScenarioContainer/></ScenarioProvider></Tab.Pane> },
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
