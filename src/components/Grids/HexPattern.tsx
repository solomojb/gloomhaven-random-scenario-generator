
import React from 'react';
import { Pattern } from '../../react-hexgrid';
import Point from '../../react-hexgrid/models/Point';
import { useGame } from '../Game/GameProvider';

type Props = {
    id:string;
    category:string;
    rotation?: number;
    postfix?:string;
    rotate:boolean;
    hexType?:string;
}

export const getHexTypeOffsets = (hexType:string | undefined) => {
    switch (hexType) {
        case "2x1R":
            return {scale:{x:2, y:1.2},
            offset: {x:10, y:-1}}
        case "2x1D":
            return {scale:{x:1, y:2},}
    }
}

const HexPattern = (props:Props) => {
    const game = useGame();
    const { id, postfix, category, rotate, hexType, rotation: itemRotation = 0} = props;

    let scale: Point = {x:1, y: 1};
    let rotation = itemRotation;
    let offsetX = 0;
    let offsetY = 0;
    let x = 6.3;
    let y = 5.41;
    switch (category) {
        case "corridors":
            x = 6.3;
            y = 5.41;
            break;
    }

    const data = getHexTypeOffsets(hexType);
    if (data) {
        if (data.scale) {
            x *= data.scale.x || 1;
            y *= data.scale.y || 1;
        }
        if (data.offset) {
            offsetX = data.offset.x || 0;
            offsetY = data.offset.y || 0;
        }
    }
    
    let link = '';
    let patternStyle = {};
    let imageStyle = {};
    if (category === "monster") {
        link = game.getMonsterImage(id, rotate);
        patternStyle = {transform: `scaleX(${scale.x}) scaley(${scale.y})`}
    } else if (category === "treasures") {
        link = game.getTreasureImage(rotate);
        patternStyle = {transform: `scaleX(${scale.x}) scaley(${scale.y})`}
    } else if (category === "coin") {
        link = game.getCoinImage();
        patternStyle = {transform: `scaleX(${scale.x}) scaley(${scale.y})`}
    } else {
        link = game.getOverlayTokenPath(id, category);
        const objectRotation = (rotation + (rotate ? 90 : 0))% 360;
        if (objectRotation && !hexType || hexType==="2x1R") {
          const transform = `rotate(${objectRotation}deg)`;
          patternStyle = {transform}
        }
        const transform = `translateX(${offsetX||0}px) translateY(${offsetY||0}px)`;
        imageStyle = {transform}
    }

    const width = rotate ? y : x;
    const height = rotate ? x : y;

    let patternId = id.replace(" ", "-");
    if (postfix) {
      patternId += postfix;
    }

    return <Pattern id={patternId} link={link} size={{x: width, y: height}} patternStyle={patternStyle} imageStyle={imageStyle}/>

}

export default HexPattern;
