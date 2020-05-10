const INITIAL_STATE = {
  user: null,
  checkingLogin: true,
  signInState: {
    signInActive: false,
  },
  signUpState: {
    accountCreated: false,
  },
};

export default function reducer(state=INITIAL_STATE , action) {
    switch (action.type) {
      case "NOT_SIGNED_IN": {
        return {...state, checkingLogin: false, };
      }
      case "TRYING_TO_SIGN_IN":{
        return {...state, 
          loading: false,
          signInState: {...state.signUpState,
            signInActive: true,
          },
        };
      }
      case "SIGN_IN_SUCESSFULL": {
        return {...state, 
          loading: false,
          signInState: {...state.signUpState,
            signInActive: false,
          },
          user: action.payload.user,
        };
      }
      case "SIGN_IN_FAILED": {
        return {...state, 
          loading: false,
          signInState: {...state.signUpState,
            signInActive: false,
          },
        };
      }
      case 'persist/REHYDRATE': {
        return {...state, }
      }
    }
    return state;
}

