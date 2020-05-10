/** Combines All Reducers into one Reducer **/
import { combineReducers } from "redux";

import dummyReducer from "./dummyReducer.js";
import navReducer from "./navReducer.js";

export default combineReducers({
  dummyReducer,
  navReducer,
})
