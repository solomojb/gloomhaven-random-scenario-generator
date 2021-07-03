import React from "react";
import { ExampleTile } from "./ExampleTile";
import {LayoutProvider, HexGrid} from "../../../react-hexgrid-2"
import "./Example.css";

const GRID_SIZE = 40;
export const ExampleContainer = () => {
    return (
        <div className="grid-container">
            <LayoutProvider spacing={1} size={{x:GRID_SIZE, y:GRID_SIZE}} flat={true}>
                <HexGrid className="example-grid">
                    <ExampleTile q={0} r={0} category="corridors" id="earth-1"/>
                    <ExampleTile q={0} r={1} category="corridors" id="man-made-stone-1"/>
                    <ExampleTile q={0} r={2} category="corridors" id="natural-stone-1"/>
                    <ExampleTile q={0} r={3} category="corridors" id="pressure-plate"/>
                    <ExampleTile q={0} r={4} category="corridors" id="wood-1"/>
                    <ExampleTile q={1} r={0} category="obstacles" id="bookcase" hexType="2x1" rotation={20}/>
                    <ExampleTile q={1} r={2} category="obstacles" id="altar"/>
                    <ExampleTile q={1} r={3} category="obstacles" id="barrel"/>
                    <ExampleTile q={1} r={4} category="obstacles" id="boulder-1"/>
                    <ExampleTile q={1} r={5} category="obstacles" id="bush"/>
                    <ExampleTile q={1} r={6} category="obstacles" id="crate"/>
                    <ExampleTile q={2} r={-1} category="traps" id="bear-trap"/>
                    <ExampleTile q={2} r={0} category="traps" id="poison-gas-trap"/>
                    <ExampleTile q={2} r={1} category="traps" id="spike-pit-trap"/>
                    <ExampleTile q={3} r={-1} category="difficult-terrain" id="rubble"/>
                    <ExampleTile q={3} r={0} category="difficult-terrain" id="stairs"/>
                    <ExampleTile q={3} r={1} category="difficult-terrain" id="water"/>
                    <ExampleTile q={4} r={-2} category="monster" id="Bandit Archer"/>
                    <ExampleTile q={4} r={-2} category="monster" id="EliteOverlay"/>
                    <ExampleTile q={4} r={-1} category="monster" id="Bandit Guard"/>
                    <ExampleTile q={4} r={0} category="monster" id="Black Imp"/> 
                </HexGrid>
            </LayoutProvider>
            <LayoutProvider spacing={1} size={{x:GRID_SIZE, y:GRID_SIZE}} flat={false}>
                <HexGrid className="example-grid-green">   
                    <ExampleTile q={0} r={0} category="corridors" id="earth-1"/>
                    <ExampleTile q={0} r={1} category="corridors" id="man-made-stone-1"/>
                    <ExampleTile q={0} r={2} category="corridors" id="natural-stone-1"/>
                    <ExampleTile q={0} r={3} category="corridors" id="pressure-plate"/>
                    <ExampleTile q={0} r={4} category="corridors" id="wood-1"/>
                    <ExampleTile q={1} r={0} category="obstacles" id="bookcase" hexType="2x1"/>
                    <ExampleTile q={1} r={2} category="obstacles" id="altar"/>
                    <ExampleTile q={1} r={3} category="obstacles" id="barrel"/>
                    <ExampleTile q={1} r={4} category="obstacles" id="boulder-1"/>
                    <ExampleTile q={1} r={5} category="obstacles" id="bush"/>
                    <ExampleTile q={1} r={6} category="obstacles" id="crate"/>
                    <ExampleTile q={2} r={-1} category="traps" id="bear-trap"/>
                    <ExampleTile q={2} r={0} category="traps" id="poison-gas-trap"/>
                    <ExampleTile q={2} r={1} category="traps" id="spike-pit-trap"/>
                    <ExampleTile q={3} r={-1} category="difficult-terrain" id="rubble"/>
                    <ExampleTile q={3} r={0} category="difficult-terrain" id="stairs"/>
                    <ExampleTile q={3} r={1} category="difficult-terrain" id="water"/>
                    <ExampleTile q={4} r={-2} category="monster" id="Bandit Archer"/>
                    <ExampleTile q={4} r={-2} category="monster" id="EliteOverlay"/>
                    <ExampleTile q={4} r={-1} category="monster" id="Bandit Guard"/>
                    <ExampleTile q={4} r={0} category="monster" id="Black Imp"/>
                </HexGrid>
            </LayoutProvider>            
        </div>
    );
};

