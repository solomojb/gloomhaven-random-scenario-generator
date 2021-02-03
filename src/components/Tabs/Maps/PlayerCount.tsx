import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { getItemViewState } from '../../../State/Selectors';
import { storeNumberOfPlayers } from "../../../State/State";

const PlayerCount = () => {
    const dispatch = useDispatch();
    const { numberOfPlayers } = getItemViewState();
    const setNumberOfPlayers = (index: number) => {
        dispatch(storeNumberOfPlayers(index));
    }
 
 return (<Button.Group>
    <Button positive={numberOfPlayers === 0} onClick={ () => setNumberOfPlayers(0)}>2</Button>
    <Button.Or />
    <Button positive={numberOfPlayers === 1} onClick={ () => setNumberOfPlayers(1)}>3</Button>
    <Button.Or />
    <Button positive={numberOfPlayers === 2} onClick={ () => setNumberOfPlayers(2)}>4+</Button>
  </Button.Group>)
}

export default PlayerCount