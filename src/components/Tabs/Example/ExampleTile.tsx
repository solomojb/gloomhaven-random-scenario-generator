import React from "react";
import { Helpers } from "../../../helpers";
// import { Helpers } from "../../helpers";
import { Hexagon } from "../../../react-hexgrid-2";
import { useLayout } from "../../../react-hexgrid-2/LayoutProvider";
import { useGame } from "../../Game/GameProvider";
// import { useDungeon } from "../Tabs/Maps/DungeonProvider";

type Props = {
    q: number;
    r: number;
    category: string;
    id:string;
    hexType?:string;
    rotation?:number;
}

export const ExampleTile = (props: Props) => {
    const { q, r, category, id, hexType, rotation } = props;
    const game = useGame();
    const {size, rotateHex} = useLayout();
    const {link, style} = Helpers.getLink({game, category, id, rotate:rotateHex, hexType, rotation});
    return <Hexagon q={q} r={r} s={0} src={link} style={style}>
        <div style={{fontSize:size.x/2, position:"absolute"}}>{`${q},${r}`}</div>
    </Hexagon>
}