const INITIAL_STATE = {
  user: null,
  checkingLogin: true,
  signInState: {
  },
  signUpState: {
    accountCreated: false,
  },
};

export default function reducer(state=INITIAL_STATE , action) {
    switch (action.type) {
      case "NOT_SIGNED_IN": {
        return {...state, checkingLogin: false };
      }
      case "SIGN_IN_SUCESSFULL": {
        return {...state, loading: false };
      }
      case 'persist/REHYDRATE': {
        return {...state, }
      }
    }
    return state;
}

