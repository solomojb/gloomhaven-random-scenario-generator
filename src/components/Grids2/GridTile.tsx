import React, { FC, ReactNode } from "react";
import { Helpers } from "../../helpers";
import { Hexagon, useLayout } from "../../react-hexgrid";
import { useGame } from "../Game/GameProvider";

type Props = {
    q: number;
    r: number;
    category: string;
    id:string;
    hexType?:string;
    rotation?:number;
    children?: ReactNode | ReactNode[];
    onClick?: () => void,
}

export const GridTile:FC<Props> = (props) => {
    const { q, r, category, id, hexType, rotation, children, onClick } = props;
    const game = useGame();
    const {rotateHex} = useLayout();
    const {link, style} = Helpers.getLink({game, category, id, rotate:rotateHex, hexType, rotation});
    return <Hexagon q={q} r={r} s={0} src={link} style={style} onClick={onClick}>
        {children}
    </Hexagon>
}