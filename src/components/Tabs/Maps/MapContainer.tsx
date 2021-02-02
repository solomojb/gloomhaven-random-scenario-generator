import React, { useEffect, useState } from "react";
import { Button, DropdownProps, Form, Label } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import { useDispatch } from "react-redux";
import { storeShowGrid } from "../../../State/State";
import { getItemViewState } from "../../../State/Selectors";
import MonsterCard from "./MonsterCard";
import MonsterSelector from "./MonsterSelector";

type TumblerProps = {
	value: number;
	step: number;
	label: string;
	onChange: (value: number) => void;
}

const Tumblers = (props:TumblerProps) => {
	const { label, value, step, onChange} = props;

	const changeValue = (up:boolean) => {
		const newVal = value + (up ? step : -step);
		onChange(newVal);
	}

	return <Form.Group inline>
		<Label>{label}</Label>
	<Button onClick={()=>{ changeValue(false) }}>-</Button>
	<Label>{value}</Label>
	<Button onClick={()=>{ changeValue(true)}}>+</Button>
   </Form.Group>

}

const MapContainer = () => {
  const game = useGame();
  const [selectedMap, setSelectedMap] = useState<string>(
    localStorage.getItem("currentMap") || game.getDungeonList()[0]
  );
  const [selectedMonster, setSelectedMonster] = useState<string>(
	localStorage.getItem("currentMonster") || game.getMonsterList()[0]
   );
   const dungeonData = game.getDungeonData(selectedMap);
  const monsterData = game.getMonsterData(selectedMonster);
  const { showGrid } = getItemViewState();
  const dispatch = useDispatch();
  const [mapScale, setMapScale] = useState<number>(dungeonData && dungeonData.tiles[0].scale || 1);
  const [offsetX, setOffsetX] = useState<number>(dungeonData && dungeonData.offsetX || 1);
  const [offsetY, setOffsetY] = useState<number>(dungeonData && dungeonData.offsetY || 1);

  const onDungeonChange = (obj: any, e: DropdownProps): void => {
    setSelectedMap(e.value as string);
    localStorage.setItem("currentMap", e.value as string);
  };

  const onMonsterChange = (obj: any, e: DropdownProps): void => {
	setSelectedMonster(e.value as string);
	localStorage.setItem("currentMonster", e.value as string);
   };
 
  useEffect( () => 
  {
	  if (!dungeonData) {
		  return;
	  }
	setMapScale(dungeonData.tiles[0].scale);
	setOffsetX(dungeonData.offsetX);
	setOffsetY(dungeonData.offsetY);
  }, [dungeonData])

  return (
    <div>
      <MapSelector
        defaultMapName={selectedMap}
        onChange={onDungeonChange}
      ></MapSelector>
      <MonsterSelector
        defaultMonsterName={selectedMonster}
        onChange={onMonsterChange}
      ></MonsterSelector>
      <Form.Group inline>
        <label>Show Grid:</label>
        <Form.Checkbox
          toggle
          checked={showGrid}
          onClick={() => {
            dispatch(storeShowGrid(!showGrid));
          }}
        />
	<Form.Group>
		<Tumblers label="Map Scale:" value={mapScale} step={.01} onChange={(value:number) => {
			setMapScale(value);
			dungeonData.tiles[0].scale = value;}}/>
		<Tumblers label="Map OffsetX:" value={offsetX} step={1} onChange={(value:number) => {setOffsetX(value); dungeonData.offsetX=value}}/>
		<Tumblers label="Map OffsetY:" value={offsetY} step={1} onChange={(value:number) => {setOffsetY(value); dungeonData.offsetY=value}}/>
	</Form.Group>
      </Form.Group>
      <Form.Group>
        {selectedMap && dungeonData && (
          <div className="map-container">
            <Map dungeonData={dungeonData} monsterData={monsterData} />
            <MapCard data={dungeonData} />
            <MonsterCard data={monsterData} />
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default MapContainer;
