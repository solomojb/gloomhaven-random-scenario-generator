import React, { useEffect, useState } from "react";
import { LayoutProvider, HexUtils } from "../../react-hexgrid";
import { useDungeon } from "../Tabs/Maps/DungeonProvider";
import HexOverlay from "../Tabs/Maps/HexOverlay";
import { useGame } from "../Game/GameProvider";

type Point = {
  x: number;
  y: number;
}

const getPoints =(corners: Point[], starting: number, count = 6) => {
  return [...Array(count)].map((_c, index) => corners[(index +starting)%6]);
}

export const createCustomLayouts = (flat: boolean, size: Point) => {
  const originalCorners = HexUtils.calculateCoordinates(flat, size);

  const drCorners = HexUtils.calculateCoordinates(flat, size, {x:1.5 * size.x, y:size.y/2 * Math.sqrt(3)});
  const dlCorners = HexUtils.calculateCoordinates(flat, size, {y:1.5 * size.x, x:-size.y/2 * Math.sqrt(3)});
  const dCorners = HexUtils.calculateCoordinates(flat, size, {x:0, y:size.y * Math.sqrt(3)});
  const d2x1 = [...getPoints(originalCorners,2), ...getPoints(dCorners,0,4)];

  const rCorners = HexUtils.calculateCoordinates(flat, size, {y:0, x:-size.x * Math.sqrt(3)});
  const lCorners = HexUtils.calculateCoordinates(flat, size, {y:0, x:size.x * Math.sqrt(3)});
  const r2x1 = [...getPoints(originalCorners,3,5), ...getPoints(rCorners, 0,5)];
  const triangle = [...getPoints(originalCorners, 2, 5), ...getPoints(drCorners,5,4), ...getPoints(dCorners,1,4)];
  const triangleA = [...getPoints(originalCorners,3,5), ...getPoints(dlCorners,5,4), ...getPoints(rCorners,1,4)];

  return {
      "2x1D": HexUtils.convertToString(d2x1),
      "2x1R": HexUtils.convertToString(r2x1),
      "2x3": HexUtils.convertToString(triangle),
      "2x3A": HexUtils.convertToString(triangleA),
  }
}

const Map = () => {
  const {dungeon: {name, map:{rotateHex}}
} = useDungeon();
const game = useGame();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(game.getMapPath(name))
  },[name, game, setPathName]);

  const size = { x: 6.2, y: 6.2 };

  return (
    <div className="map">
        <div>
          <img src={pathName}/>
        </div>
        <LayoutProvider size={size} flat={!rotateHex} spacing={1} origin={{ x: 0, y: 0 }} customLayouts={createCustomLayouts(!rotateHex, size)}>
          <HexOverlay/>
        </LayoutProvider>
    </div>
  );
};

export default Map;
