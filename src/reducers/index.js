/** Combines All Reducers into one Reducer **/
import { combineReducers } from "redux";

import analyticsReducer from "./analyticsReducer.js";
import dummyReducer from "./dummyReducer.js";
import navReducer from "./navReducer.js";
import popupReducer from "./popupReducer.js";

export default combineReducers({
  analyticsReducer,
  dummyReducer,
  navReducer,
  popupReducer,
})
