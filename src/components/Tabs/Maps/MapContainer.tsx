import React, { useEffect, useState } from "react";
import { Button, DropdownProps, Form, Label } from "semantic-ui-react";
import MapSelector from "./MapSelector";
import { useGame } from "../../Game/GameProvider";
import Map from "./Map";
import MapCard from "./MapCard";
import { useDispatch } from "react-redux";
import { storeShowGrid } from "../../../State/State";
import { getItemViewState } from "../../../State/Selectors";

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
  const dungeonData = game.getDungeonData(selectedMap);
  const { showGrid } = getItemViewState();
  const dispatch = useDispatch();
  const [mapScale, setMapScale] = useState<number>(dungeonData && dungeonData.scale || 1);
  const [offsetX, setOffsetX] = useState<number>(dungeonData && dungeonData.offsetX || 1);
  const [offsetY, setOffsetY] = useState<number>(dungeonData && dungeonData.offsetY || 1);

  const onChange = (obj: any, e: DropdownProps): void => {
    setSelectedMap(e.value as string);
    localStorage.setItem("currentMap", e.value as string);
  };

  useEffect( () => 
  {
	  if (!dungeonData) {
		  return;
	  }
	setMapScale(dungeonData.scale);
	setOffsetX(dungeonData.offsetX);
	setOffsetY(dungeonData.offsetY);
  }, [dungeonData])

  return (
    <div>
      <MapSelector
        defaultMapName={selectedMap}
        onChange={onChange}
      ></MapSelector>
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
			dungeonData.scale = value;}}/>
		<Tumblers label="Map OffsetX:" value={offsetX} step={1} onChange={(value:number) => {setOffsetX(value); dungeonData.offsetX=value}}/>
		<Tumblers label="Map OffsetY:" value={offsetY} step={1} onChange={(value:number) => {setOffsetY(value); dungeonData.offsetY=value}}/>
	</Form.Group>
      </Form.Group>
      <Form.Group>
        {selectedMap && dungeonData && (
          <div className="map-container">
            <Map data={dungeonData} />
            <MapCard data={dungeonData} />
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default MapContainer;
