import React, { useState } from 'react';
import { Provider } from 'react-redux'
import { Container, DropdownProps, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MainView from './components/Tabs/MainView';
import GameProvider from './components/Game/GameProvider'
import { gameDataTypes } from './games';
import { GameType } from './components/Game/GameType';


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
            <GameProvider gameType={gameType}>
                <MainView/>
            </GameProvider>
        </Container>
    );
}

export default App;
