import { combineReducers } from "redux";

import turn from "./turn";
import modals from "./modals";
import movies from "./movies";

export default combineReducers({
  turn,
  modals,
  movies,
});
