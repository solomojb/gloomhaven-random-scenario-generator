import { OverlayTile, SpawnCategory } from "../../../Data";
import { Helpers } from "../../../helpers";
import { InfoData } from "./MapInfoData";

const getOverlayName = (pattern:string) => {
    if (pattern.includes("boulder")) {
      return "Boulder";
    } 
    if (pattern.includes("man-made-stone")) {
      return "Stone"
    }
    if (pattern.includes("coin-")) {
      return "Coin"
    }
    return Helpers.toAllFirstUpper(pattern.replace("-", " "));
  }
  

type OverlayMap = {
    [k in string]: InfoData;
  };

type OverlayCount = {
    [k in string]: number;
  };

const reducer = (acc: OverlayCount, current:OverlayTile) =>{
    if (!acc[current.pattern]) {
      acc[current.pattern] = 1;
    } else {
      acc[current.pattern]++
    }
    return acc;
  }

export const getOverlayInfo = (overlays: OverlayTile[], category: SpawnCategory) => {
    if (!overlays) {
        return [];
    }
    const overlayCounts:OverlayCount = overlays.reduce( reducer, {});
         
    const overlayReducer = (acc: OverlayMap, current:OverlayTile) =>{
      if (!acc[current.pattern]) {
        acc[current.pattern] = {pattern: current.pattern, category, displayName: `${getOverlayName(current.pattern)} x ${overlayCounts[current.pattern]}`};
      } 
      return acc;
    }
    
    return Object.values(overlays.reduce( overlayReducer, {}));
  
}
