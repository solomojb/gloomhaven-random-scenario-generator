import React, { useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";

const MonsterSelector = () => {
    const game = useGame();
    const { setMonsters } = useDungeon();
    const [selectedMonster, setSelectedMonster] = useState<string>(
        localStorage.getItem("currentMonster") || game.getMonsterList()[0]
      );
      const onMonsterChange = (obj: any, e: DropdownProps): void => {
        setSelectedMonster(e.value as string);
        setMonsters(game.getMonsterData(e.value as string));
        localStorage.setItem("currentMonster", e.value as string);
      };
   

    const options:any = game.getMonsterList().map((name) => { return {text:name, value:name}});

    return <>    
        <Form.Select 
            value={selectedMonster}
            options={options}
            onChange={onMonsterChange}/>
        </>
}

export default MonsterSelector;
