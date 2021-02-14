import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Container, DropdownProps, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import dbApp from "./State/Reducer";
import MainView from './components/Tabs/MainView';
import GameProvider from './components/Game/GameProvider'
import { gameDataTypes } from './games';
import { GameType } from './State/GameType';

// @ts-ignore
export const store = createStore(dbApp,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

type GameSelectorProps = {
    onChange:(obj:any,e:DropdownProps) => void;
    defaultGameType:GameType;
}

const GameSelector = (props:GameSelectorProps) => {
    const {onChange, defaultGameType} = props;
    const options:any[] = [];
    Object.values(GameType).forEach( (gameType) =>{
        const gameData = gameDataTypes[gameType as GameType];
        options.push({text:gameData.name, value:gameType});
    } )

    return <>    
        <Form.Select 
            value={defaultGameType}
            options={options}
            onChange={onChange}/>
        </>
}


const App = () => {
    const [gameType, setGameType] = useState<GameType>(localStorage.getItem("lastGame") as GameType || GameType.Gloomhaven);

    const onGameTypeChanged = (obj:any, e:DropdownProps):void => {
        setGameType(e.value as GameType);
        localStorage.setItem("lastGame", e.value as GameType);
    }

    return (
        <Container>
            {Object.values(GameType).keys.length > 1 && <GameSelector defaultGameType={gameType} onChange={onGameTypeChanged}/>}
            <Provider store={store}>
                <GameProvider gameType={gameType}>
                    <MainView/>
                </GameProvider>
            </Provider>
        </Container>
    );
}

export default App;
