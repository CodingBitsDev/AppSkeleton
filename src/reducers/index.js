/** Combines All Reducers into one Reducer **/
import { combineReducers } from "redux";

import authReducer from "./authReducer.js";
import analyticsReducer from "./analyticsReducer.js";
import navReducer from "./navReducer.js";
import popupReducer from "./popupReducer.js";

export default combineReducers({
  authReducer,
  analyticsReducer,
  navReducer,
  popupReducer,
})
