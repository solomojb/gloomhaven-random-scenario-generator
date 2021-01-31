import React from 'react';
import { Tab } from 'semantic-ui-react';

const MainView = () => {

    let panes = [
        { menuItem: 'Map',                render: () => <Tab.Pane></Tab.Pane> },
    ];
    
    return (
        <>
            <Tab panes={panes} defaultActiveIndex={0}/>
            <em className={'pull-right ui text grey'}>Gloomhaven and all related properties, images and text are owned by <a href={'https://www.cephalofair.com/'} target={'_blank'} rel={'noopener'}>Cephalofair Games</a>.</em>
        </>
    );

}

export default MainView;
