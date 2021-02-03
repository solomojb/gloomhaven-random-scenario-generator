import React from "react";
import { MapData } from "../../../State/MapData";
import { MonsterData } from "../../../State/MonsterData";
import MapOverlayTile from "./MapOverlayTile";
import MonsterOverlayTile from "./MonsterOverlayTile";

type Props = {
    monsterData: MonsterData;
    mapData: MapData;
}

export type MapDataInfo = {
    count: number;
    category: string;
}

export type MonsterCount = {
    [k in string]: MapDataInfo;
};

const MapInfo = (props: Props) => {
    const { monsterData, mapData: { obstacles, corridors} } = props;
    const counts: MonsterCount = {};
    monsterData.spawns.forEach( spawn => {
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
        return <div style={{maxWidth:"100px", display:"flex", flexDirection:"column"}}>
                    {category === "monster" ? <MonsterOverlayTile className={"monster-image-info"} monsterName={type}/> :
                    <MapOverlayTile tileName={type} rotateHex={false} category={category}/>}                
                    {`${type} x ${count}`}
                </div>;
    });

    // let info3 = Object.keys(overlayCounts).map( (type) => {
    //     return <div style={{maxWidth:"100px", display:"flex", flexDirection:"column"}}>
    //                 <MapOverlayTile tileName={type} rotateHex={false} category="obstacles"/>
    //                 {`${overlayCounts[type]}x ${type}`}
    //             </div>;
    // });

    // let info2 = Object.keys(obstaclesCount).map( (type) => {
    //     return <div style={{maxWidth:"100px", display:"flex", flexDirection:"column"}}>
    //                 <MapOverlayTile tileName={type} rotateHex={false} category="obstacles"/>
    //                 {`${obstaclesCount[type]}x ${type}`}
    //             </div>;
    // });
   
    return (<div  style={{display: "flex", flexDirection:"row", flexWrap: "wrap"}}>
        {info}
    {/* //     {info2}
    //     {info3} */}
         </div>);
    return null;
}

export default MapInfo;