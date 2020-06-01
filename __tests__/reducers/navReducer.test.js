import { navTypes, persistTypes } from "actions/types.js";
import reducer from "reducers/navReducer.js";

const INITIAL_STATE = {
  navState: [],
  currentNavAction: null,
};


function testActions( type, action, testState, startState=INITIAL_STATE ){
  it(' should return a different state than startState when getting ' + type, () => {
    const newState = reducer( startState, action );
    expect(newState).not.toEqual(startState);
    expect(newState).toEqual(testState);
  }) 

  it(' should should not change the initial state variable when getting ' + type, ()  => {
    let initalState = INITIAL_STATE;
    reducer( initalState, action );
    expect(initalState).toEqual(INITIAL_STATE);
  })
}

describe( "NavReducer Reducer", () => {
  describe( "General Tests", () => {
  it('should return INITIAL_STATE state', () => {
    const newState = reducer( undefined, {} );
    expect(newState).toEqual(INITIAL_STATE);
  });
  });

  //ActionTests
  //*************
  //NAV_STATE_CHANGED
  //*************
  describe( "NavType: NAV_STATE_CHANGED", () => {
    const type="NAV_STATE_CHANGED";
    const action = {
      type: navTypes[type],
      payload: { navState: "NavState" },
    }
    const testState={...INITIAL_STATE,
      navState: action.payload.navState,
    };

    testActions( type, action, testState );
  });

  //PERSIST Rehydrate
  describe( "PersistTypes: REHYDRATE", () => {
    const type="REHYDRATE";
    const action = {
      type: persistTypes[type],
      payload: { navReducer: { navState: "Test" } }
    }

    const testState = {...INITIAL_STATE, };

    it(' should return a different state than startState when getting ' + type, () => {
      const newState = reducer( undefined, action );
      expect(newState).toEqual(INITIAL_STATE);
    }) 

    it(' should should not change the initial state variable when getting ' + type, ()  => {
      let initalState = INITIAL_STATE;
      reducer( initalState, action );
      expect(initalState).toEqual(INITIAL_STATE);
    })
  });
});
