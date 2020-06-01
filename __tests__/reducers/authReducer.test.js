import { authTypes, persistTypes } from "actions/types.js";
import reducer from "reducers/authReducer.js";

const INITIAL_STATE = {
  proceedWithoutAccount: false,
  user: null,
  checkingLogin: true,
  signInState: {
    signInActive: false,
  },
  signUpState: {
    signUpActive: false,
  },
  signInError: "",
  signInWarning: "",
  signUpError: "",
  signUpWarning: "",
  persistSignedIn: null,
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

describe( "Auth Reducer", () => {
  describe( "General Tests", () => {
  it('should return INITIAL_STATE state', () => {
    const newState = reducer( undefined, {} );
    expect(newState).toEqual(INITIAL_STATE);
  });
  });

  //ActionTests
  //*************
  //NOT_SIGNED_IN
  //*************
  describe( "AuthType: NOT_SIGNED_IN", () => {
    const type="NOT_SIGNED_IN";
    const action = {
      type: authTypes[type],
    }
    const testState={...INITIAL_STATE,
      checkingLogin: false
    };

    testActions( type, action, testState );
  });

  //*********************
  //PROCEED_WITHOUT_LOGIN
  //*********************
  describe( "AuthType: PROCEED_WITHOUT_LOGIN", () => {
    const type="PROCEED_WITHOUT_LOGIN";
    const action = {
      type: authTypes[type],
    }

    const testState = {...INITIAL_STATE,
      proceedWithoutAccount: true,
    }

    testActions( type, action, testState );
  });

  //**************
  //SIGN_IN_FAILED
  //**************
  describe( "AuthType: SIGN_IN_FAILED", () => {
    const type="SIGN_IN_FAILED";
    const action = {
      type: authTypes[type],
      payload: {
        userName: "Name",
        password: "Password",
        error: "TEST_ERROR",
      }
    }
    const testState = {...INITIAL_STATE, 
      signInState: {...INITIAL_STATE.signInState,
        signInActive: false,
      },
      signInError: action.payload.message,
    };

    testActions( type, action, testState );
  });


  //******************
  //SIGN_IN_SUCESSFULL
  //******************
  describe( "AuthType: SIGN_IN_SUCESSFULL", () => {
    const type="SIGN_IN_SUCESSFULL";
    const action = {
      type: authTypes[type],
      payload: {
        relogin: false,
        userName: "NAME",
        password: "PASSWORD",
        user: {
          uid: "123456"
        },
      }
    }
    const testState = {...INITIAL_STATE, 
      checkingLogin: false,
      signInState: {...INITIAL_STATE.signInState,
        signInActive: false,
      },
      user: action.payload.user,
      persistSignedIn: action.payload.user,
      proceedWithoutAccount: false,
    };

    testActions( type, action, testState );
  });

  //**************
  //SIGN_UP_FAILED
  //**************
  describe( "AuthType: SIGN_UP_FAILED", () => {
    const type="SIGN_UP_FAILED";
    const action = {
      type: authTypes[type],
      payload: {
        userName: "Name",
        password: "Password",
        error: "TEST_ERROR",
      }
    }
    const testState = {...INITIAL_STATE, 
      signUpState: {...INITIAL_STATE.signUpState,
        signUpActive: false,
      },
      signUpError: action.payload.message,
    };
    testActions( type, action, testState );
  });

  //******************
  //SIGN_UP_SUCESSFULL
  //******************
  describe( "AuthType: SIGN_UP_SUCESSFULL", () => {
    const type="SIGN_UP_SUCESSFULL";
    const action = {
      type: authTypes[type],
      payload: {
        userName: "Name",
        password: "Password",
        user: { uid: "123456" }
      }
    }
    const testState = {...INITIAL_STATE, 
      signUpState: {...INITIAL_STATE.signUpState,
        signUpActive: false,
      },
      user: action.payload.user,
    };

    testActions( type, action, testState );
  });

  //TRYING_TO_SIGN_IN
  describe( "AuthType: TRYING_TO_SIGN_IN", () => {
    const type="TRYING_TO_SIGN_IN";
    const action = {
      type: authTypes[type],
      payload: {
        userName: "Name",
        password: "Password",
      }
    }
    const testState = {...INITIAL_STATE, 
      signInState: {...INITIAL_STATE.signInState,
        signInActive: true,
      },
    };

    testActions( type, action, testState );
  });
  
  //TRYING_TO_SIGN_UP
  describe( "AuthType: TRYING_TO_SIGN_UP", () => {
    const type="TRYING_TO_SIGN_UP";
    const action = {
      type: authTypes[type],
      payload: {
        userName: "Name",
        password: "Password",
      }
    }
    const testState = {...INITIAL_STATE, 
      signUpState: {...INITIAL_STATE.signUpState,
        signUpActive: true,
      },
    };

    const startState = reducer( INITIAL_STATE, {
      type: authTypes[type],
      payload: {
        relogin: false,
        userName: "NAME",
        password: "PASSWORD",
        user: {
          uid: "123456"
        },
      }
    })

    testActions( type, action, testState );
  });

  //USER_SIGNED_OUT
  describe( "AuthType: USER_SIGNED_OUT", () => {
    const type="USER_SIGNED_OUT";
    const action = {
      type: authTypes[type],
    }
    const testState = {...INITIAL_STATE, 
      checkingLogin: false,
    };

    const startState = {...INITIAL_STATE, 
      signUpState: {...INITIAL_STATE.signUpState,
        signUpActive: true,
      },
    };

    testActions( type, action, testState, startState );
  });

  //PERSIST Rehydrate
  describe( "PersistTypes: REHYDRATE", () => {
    const type="REHYDRATE";
    const action = {
      type: persistTypes[type],
      payload: {
        authReducer:{ 
          persistSignedIn: "Test",
          proceedWithoutAccount: "proceed",
        },
      }
    }

    const testState = {...INITIAL_STATE, 
      persistSignedIn: action.payload.authReducer.persistSignedIn, 
      proceedWithoutAccount: action.payload.authReducer.proceedWithoutAccount, 
    };

    testActions( type, action, testState);
  });

});
