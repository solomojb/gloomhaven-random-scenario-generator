import {combineReducers } from "redux";
import stateReducer from "./State"

const rootReducer = combineReducers( { stateReducer} );

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;