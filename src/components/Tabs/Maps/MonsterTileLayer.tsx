import React, { ReactNode } from "react"
import { Hexagon, Text, Pattern} from "react-hexgrid"
import { OverlayTile } from "../../../Data";
import { getItemViewState } from "../../../State/Selectors";
import { useGame } from "../../Game/GameProvider";
import { useDungeon } from "./DungeonProvider";
import HexOverlay from "./HexOverlay";

type Props = {
}

const MonsterTileLayer = (props: Props) => {
    const game = useGame();
    const { numberOfPlayers } = getItemViewState();
    const { dungeon: {spawnPoints}, monsterData: { spawns }} = useDungeon();

    const buildHex = (spawnPoint:OverlayTile, pattern:string) => {
        const { q, r} = spawnPoint;
        return <Hexagon q={q} r={r} fill={pattern.replace(" ", "-")}/>
     }

     const hexes: JSX.Element[] = [];
     spawns.forEach( spawn => {
            const { type, id, monsterType, category } = spawn;
            const spawnPoint = spawnPoints.find( spawn => spawn.id === id);
            if (spawnPoint && type) {
                if (category === "monster") {
                    const monsterKey = monsterType[numberOfPlayers];
                    if (monsterKey != "none") {
                        hexes.push(buildHex(spawnPoint, type));   
                        if (monsterKey === "elite") {
                            hexes.push(buildHex(spawnPoint, monsterKey));        
                        }     
                    }
                }
                else {
                    hexes.push(buildHex(spawnPoint, type));
                }
            }});

      const patterns = spawns.map( spawn => {
            const { type, category } = spawn;
            if (category === "monster") {
                return <Pattern id={type.replace(" ", "-")} link={game.getMonsterImage(type, false)} size={{x:6.2, y:5.6}}/>;
            } else {
                return <Pattern id={type} link={game.getOverlayTokenPath(type, category)} size={{x:6.3, y:5.410}}/>;
           }
      });

      patterns.push(<Pattern id={"elite"} link={game.getMonsterImage("EliteOverlay", false)} size={{x:6.2, y:5.6}}/>)

    return <HexOverlay hexes={hexes} className={"map-grid"} patterns={patterns}/>
}

export default MonsterTileLayer;