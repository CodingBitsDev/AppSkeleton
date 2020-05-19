const INITIAL_STATE = {
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
};

export default function reducer(state=INITIAL_STATE , action) {
    switch (action.type) {
      case "NOT_SIGNED_IN": {
        return {...state, checkingLogin: false,};
      }
      case "TRYING_TO_SIGN_IN":{
        return {...state, 
          loading: false,
          signInState: {...state.signInState,
            signInActive: true,
          },
        };
      }
      case "SIGN_IN_SUCESSFULL": {
        return {...state, 
          loading: false,
          signInState: {...state.signInState,
            signInActive: false,
          },
          user: action.payload.user,
        };
      }
      case "SIGN_IN_FAILED": {
        return {...state, 
          loading: false,
          signInState: {...state.signInState,
            signInActive: false,
          },
          signInError: action.payload.message,
        };
      }
      case "TRYING_TO_SIGN_UP":{
        return {...state, 
          loading: false,
          signUpState: {...state.signUpState,
            signUpActive: true,
          },
        };
      }
      case "SIGN_UP_SUCESSFULL": {
        return {...state, 
          loading: false,
          signUpState: {...state.signUpState,
            signUpActive: false,
          },
          user: action.payload.user,
        };
      }
      case "SIGN_UP_FAILED": {
        return {...state, 
          loading: false,
          signUpState: {...state.signUpState,
            signUpActive: false,
          },
          signUpError: action.payload.message,
        };
      }
      case 'persist/REHYDRATE': {
        return {...state, }
      }
    }
    return state;
}

