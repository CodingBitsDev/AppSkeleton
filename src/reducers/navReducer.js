import { getActiveScreen } from "../helperFunctions/navHelpers.js";

const INITIAL_STATE = {
  navState: [],
  currentNavAction: null,
};


export default function reducer(state=INITIAL_STATE , action) {
  switch (action.type) {
    case "NAVIGATE":{
      return {...state,
        currentNavAction: action,
      };
    }
    case "RESET":{
      return {...state,
        currentNavAction: action,
      };
    }
    case "GO_BACK":{
      return {...state,
        currentNavAction: action,
      };
    }
    case "NAV_STATE_CHANGED":{
      return {...state,
        navState: action.payload.navState,
      }
    }
  }
  return state;
}

