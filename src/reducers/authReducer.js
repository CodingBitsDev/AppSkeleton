import { authTypes, persistTypes } from "src/actions/types.js";

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

export default function reducer(state=INITIAL_STATE , action) {
    switch (action.type) {
      case authTypes.NOT_SIGNED_IN: {
        return {...state, checkingLogin: false,};
      }
      case authTypes.TRYING_TO_SIGN_IN:{
        return {...state, 
          signInState: {...state.signInState,
            signInActive: true,
          },
        };
      }
      case authTypes.SIGN_IN_SUCESSFULL: {
        return {...state, 
          checkingLogin: false,
          signInState: {...state.signInState,
            signInActive: false,
          },
          user: action.payload.user,
          persistSignedIn: action.payload.user,
          proceedWithoutAccount: false,
        };
      }
      case authTypes.SIGN_IN_FAILED: {
        return {...state, 
          signInState: {...state.signInState,
            signInActive: false,
          },
          signInError: action.payload.message,
        };
      }
      case authTypes.TRYING_TO_SIGN_UP:{
        return {...state, 
          signUpState: {...state.signUpState,
            signUpActive: true,
          },
        };
      }
      case authTypes.SIGN_UP_SUCESSFULL: {
        return {...state, 
          signUpState: {...state.signUpState,
            signUpActive: false,
          },
          user: action.payload.user,
        };
      }
      case authTypes.SIGN_UP_FAILED: {
        return {...state, 
          signUpState: {...state.signUpState,
            signUpActive: false,
          },
          signUpError: action.payload.message,
        };
      }
      case authTypes.USER_SIGNED_OUT: {
        return {...INITIAL_STATE,
          checkingLogin: false,
        }
      }
      case authTypes.PROCEED_WITHOUT_LOGIN: {
        return {...state,
          proceedWithoutAccount: true,
        }
      }
      case persistTypes.REHYDRATE: {
        let authState = action.payload && action.payload.authReducer || {};
        return {...state,
          persistSignedIn: authState.persistSignedIn || INITIAL_STATE.persistSignedIn,
          proceedWithoutAccount: authState.proceedWithoutAccount || INITIAL_STATE.proceedWithoutAccount,
        }
      }
    }
    return state;
}

