
import React from 'react';
import { Pattern } from '../../../../react-hexgrid';
import { useGame } from '../../../Game/GameProvider';
import { useDungeon } from '../DungeonProvider';

type Props = {
    id:string;
    size: {x:number, y:number};
    offset?: {x:number, y:number};
    category:string;
    rotation?: number;
    scale?: number;
    useRotate?: boolean;
    postfix?:string;
}

const HexPattern = (props:Props) => {
    const { dungeon: {map : { rotateHex }}} = useDungeon();
    const game = useGame();
    const { id, postfix, category, size: {x,y}, offset:{x:offsetX,y:offsetY} = {x: 0, y: 0}, rotation = 0, scale=1, useRotate=true} = props;
    
    let link = '';
    let patternStyle = {};
    let imageStyle = {};
    const shouldRotateTile = useRotate && rotateHex;
    if (category === "monster") {
        link = game.getMonsterImage(id, shouldRotateTile);
        patternStyle = {transform: `scale(${scale})`}
    } else if (category === "treasures") {
        link = game.getTreasureImage(shouldRotateTile);
        patternStyle = {transform: `scale(${scale})`}
    } else if (category === "coin") {
        link = game.getCoinImage();
        patternStyle = {transform: `scale(${scale})`}
    } else {
        link = game.getOverlayTokenPath(id, category);
        const objectRotation = (rotation + (shouldRotateTile ? 90 : 0))% 360;
        if (objectRotation) {
          const transform = `rotate(${objectRotation}deg)`;
          patternStyle = {transform}
        }
        const transform = `translateX(${offsetX||0}px) translateY(${offsetY||0}px)`;
        imageStyle = {transform}
    }

    const width = shouldRotateTile ? y : x;
    const height = shouldRotateTile ? x : y;

    let patternId = id.replace(" ", "-");
    if (rotation !== 0) {
        patternId += rotation;
    }
    if (postfix) {
      patternId += postfix;
    }

    return <Pattern id={patternId} link={link} size={{x: width, y: height}} patternStyle={patternStyle} imageStyle={imageStyle}/>

}

export default HexPattern;
