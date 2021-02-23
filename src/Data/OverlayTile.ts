import Point from "../react-hexgrid/models/Point";

export interface OverlayTile {
    id: number;
    pattern: string;
    q: number;
    r: number;
    rotation: number;
    scale: Point;
    hexType: string;
    offset: Point;
}
