import React from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { useGame } from "../../Game/GameProvider";

type GameSelectorProps = {
    onChange:(obj:any,e:DropdownProps) => void;
    defaultMonsterName:string;
}

const MonsterSelector = (props:GameSelectorProps) => {
    const {onChange, defaultMonsterName: defaultMapName} = props;
    const game = useGame();

    const options:any = game.getMonsterList().map((name) => { return {text:name, value:name}});

    return <>    
        <Form.Select 
            value={defaultMapName}
            options={options}
            onChange={onChange}/>
        </>
}

export default MonsterSelector;
