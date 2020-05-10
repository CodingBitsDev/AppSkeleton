import { getActiveScreen } from "../helperFunctions/navHelpers.js";

const INITIAL_STATE = {
  navState: [],
  currentNavAction: null,
};


export default function reducer(state=INITIAL_STATE , action) {
  switch (action.type) {
    case "NAV_STATE_CHANGED":{
      return {...state,
        navState: action.payload.navState,
      }
    }
    case 'persist/REHYDRATE': {
      return {...state, }
    }
  }
  return state;
}

