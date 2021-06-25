
import React from 'react';
import { Pattern } from '../../react-hexgrid';
import { useLayout } from '../../react-hexgrid/LayoutProvider';
import Point from '../../react-hexgrid/models/Point';
import { useGame } from '../Game/GameProvider';

type Props = {
    id:string;
    category:string;
    postfix?:string;
    hexType?:string;
}

export const getHexTypeOffsets = (hexType:string | undefined) => {
    switch (hexType) {
        case "2x1R":
            return {scale:{x:2, y:1.2},
            offset: {x:10, y:-1}}
        case "2x1D":
            return {scale:{x:1, y:2},}
        case "2x3":
            return {scale:{x:2, y:2},offset: {x:-2, y:0}}
        case "2x3A":
                return {scale:{x:2, y:2},offset: {x:10, y:-1}}
            }
}

const HexPattern = (props:Props) => {
    const game = useGame();
    const { rotateHex } = useLayout();
    let {width,height} = rotateHex ? {height:6.3, width:5.5}: {width:6.3, height:5.41}
    const { id, postfix, category, hexType} = props;

    let scale: Point = {x:1, y: 1};
    let offsetX = 0;
    let offsetY = 0;

    const data = getHexTypeOffsets(hexType);
    if (data) {
        if (data.scale) {
            width *= data.scale.x || 1;
            height *= data.scale.y || 1;
        }
        if (data.offset) {
            offsetX = data.offset.x || 0;
            offsetY = data.offset.y || 0;
        }
    }
    
    let link = '';
    let patternStyle = {};
    let imageStyle = {};
    switch (category) {
        case "monster": 
            link = game.getMonsterImage(id, rotateHex);
            patternStyle = {transform: `scaleX(${scale.x}) scaley(${scale.y})`}
            break;
        case "treasures":
            link = game.getTreasureImage(rotateHex);
            patternStyle = {transform: `scaleX(${scale.x}) scaley(${scale.y})`}
            break;
        case "coin":
            link = game.getCoinImage();
            patternStyle = {transform: `scaleX(${scale.x}) scaley(${scale.y})`}
            break;
        case "status":
            link = require('../../img/icons/status/'+id.toLowerCase()+'.png')
            break;
        default:
            link = game.getOverlayTokenPath(id, category);
            const objectRotation = ((rotateHex ? 90 : 0))% 360;
            if (objectRotation) {
            const transform = `rotate(${objectRotation}deg)`;
            patternStyle = {transform}
            }
            const transform = `translateX(${offsetX||0}px) translateY(${offsetY||0}px)`;
            imageStyle = {transform}
            break;
    }

    let patternId = id.replace(" ", "-");
    if (postfix) {
      patternId += postfix;
    }

    return <Pattern id={patternId} link={link} size={{x: width, y: height}} patternStyle={patternStyle} imageStyle={imageStyle}/>

}

export default HexPattern;
