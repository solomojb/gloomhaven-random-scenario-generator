import React from 'react';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import MainView from './components/Tabs/MainView';
import GameProvider from './components/Game/GameProvider'

const App = () => {
    return (
        <Container>
            <GameProvider>
                <MainView/>
            </GameProvider>
        </Container>
    );
}

export default App;
