import React, { useState } from "react";
import { DropdownProps, Form } from "semantic-ui-react";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";

const MapSelector = () => {
    const game = useGame();
    const { setDungeon } = useDungeon();
    const [selectedMap, setSelectedMap] = useState<string>(
        localStorage.getItem("currentMap") || game.getDungeonList()[0]
      );
    
    const onDungeonChange = (obj: any, e: DropdownProps): void => {
        setSelectedMap(e.value as string);
        setDungeon(game.getDungeonData(e.value as string));
        localStorage.setItem("currentMap", e.value as string);
      };
   

    const options:any = game.getDungeonList().map((name) => { return {text:name, value:name}});

    return <>    
        <Form.Select 
            value={selectedMap}
            options={options}
            onChange={onDungeonChange}/>
        </>
}

export default MapSelector;
