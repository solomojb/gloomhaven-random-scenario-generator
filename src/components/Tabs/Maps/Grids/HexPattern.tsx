
import React from 'react';
import { gameDataTypes } from '../../../../games';
import { useGame } from '../../../Game/GameProvider';
import { useDungeon } from '../DungeonProvider';

type Props = {
    id:string;
    size: {x:number, y:number};
    category:string;
    rotation?: number;
}

const HexPattern = (props:Props) => {
    const { dungeon: {map : { rotateHex }}} = useDungeon();
    const game = useGame();
    const { id, category, size: {x,y}, rotation = 0} = props;

    let link = '';
    let style = {};
    if (category === "monster") {
        link = game.getMonsterImage(id, rotateHex);
    }
    else {
        link = game.getOverlayTokenPath(id, category);
        const objectRotation = (rotation + (rotateHex ? 90 : 0))% 360;
        style = {transform: `rotate(${objectRotation}deg)`}
    }

    const width = rotateHex ? y : x;
    const height = rotateHex ? x : y;

    let patternId = id.replace(" ", "-");
    if (rotation != 0) {
        patternId += rotation;
    }

    return (
      <defs>
        <pattern id={patternId} patternUnits="objectBoundingBox" x={0} y={0} width={width} height={height} style={style}>
          <image xlinkHref={link} x={0} y={0} width={width*2} height={height*2} />
        </pattern>
      </defs>
    );

}

export default HexPattern;
