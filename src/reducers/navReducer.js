import { getActiveScreen } from "../helperFunctions/navHelpers.js";

import { navTypes } from "actions/types.js";

const INITIAL_STATE = {
  navState: [],
  currentNavAction: null,
};


export default function reducer(state=INITIAL_STATE , action) {
  switch (action.type) {
    case navTypes.NAV_STATE_CHANGED:{
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

