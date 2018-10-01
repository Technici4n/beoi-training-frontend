import { combineReducers } from "redux";
import { reduceVjudge } from "./vjudge";

export default combineReducers({
    vjudge: reduceVjudge,
});