import React from "react";
import { Form, Grid } from "semantic-ui-react";
import { MonsterData } from "../../../Data";
import { useDungeon } from "./DungeonProvider";
import MapOverlayTile from "./MapOverlayTile";
import MonsterOverlayTile from "./MonsterOverlayTile";

type Props = {
    monsterData: MonsterData;
}

export type MapDataInfo = {
    count: number;
    category: string;
}

export type MonsterCount = {
    [k in string]: MapDataInfo;
};

const MapInfo = (props: Props) => {
    const { dungeon:  { obstacles, corridors } } = useDungeon();
    const { monsterData: { spawns } } = props;
    const counts: MonsterCount = {};
    spawns.forEach( spawn => {
        const { type, category } = spawn;
        let countData = counts[type];
        if (!countData) {
            countData = { count: 1, category}
        } else { 
            countData.count += 1;
        }
        counts[type] = countData;
    })

    obstacles.forEach( obstacle => {
        const { type } = obstacle;
        let countData = counts[type];
        if (!countData) {
            countData = { count: 1, category:"obstacles"}
        } else { 
            countData.count += 1;
        }
        counts[type] = countData;
    })

    if (corridors) {
        corridors.forEach( corridor => {
            const { type } = corridor;
            let countData = counts[type];
            if (!countData) {
                countData = { count: 1, category:"corridors"}
            } else { 
                countData.count += 1;
            }
            counts[type] = countData;
        })
    }

    let info = Object.keys(counts).map( (type) => {
        const { category, count} = counts[type];
        if (!category) {
            return null;
        }
        return <Form.Field>
                    <div style={{maxWidth:"100px", display:"flex", flexDirection:"column"}}>
                        {category === "monster" ? <MonsterOverlayTile className={"monster-image-info"} monsterName={type}/> :
                        <MapOverlayTile tileName={type} category={category}/>}                
                        {`${type} x ${count}`}
                    </div>
                </Form.Field>
    });
   
    return (<Grid>
        {info}
         </Grid>);
}

export default MapInfo;