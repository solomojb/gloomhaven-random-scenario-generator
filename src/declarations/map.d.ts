declare module 'list-react-files';
interface HexColumn {
    q: number;
    minR: number;
    maxR: number;
}

interface MapData {
    tiles: string[],
    rotateHex: boolean;
    hexColumns: HexColumn[];
}