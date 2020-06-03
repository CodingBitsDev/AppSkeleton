import { authTypes } from "src/actions/types.js";

export async function checkSignIn(){
  //This code has to be changed depending on how the signinCheck is going to be done
  return( async (dispatch, getState) => {
    let authState = getState().authReducer || {};
    if ( !authState.persistSignedIn ) {
      dispatch({
        type: authTypes.NOT_SIGNED_IN,
      });
    } else {
      dispatch({
        type: authTypes.SIGN_IN_SUCESSFULL,
        payload: {
          user: authState.persistSignedIn,
          relogin: true,
        }
      })
    }
  });
}

export async function signIn( userName, password ){
  return( async (dispatch, getState) => {
    dispatch({
      type: authTypes.TRYING_TO_SIGN_IN,
      payload: {
        userName,
        password,
      },
    });
    //TODO Replace with acuall SignInCode
    try {
      await timeout(1000);
      let user = { uid: "123456", name: "Test" };
      dispatch({
        type: authTypes.SIGN_IN_SUCESSFULL,
        payload: {
          relogin: false,
          userName,
          password,
          user,
        },
      });

    } catch(error) {
    dispatch({
      type: authTypes.SIGN_IN_FAILED,
      payload: {
        userName,
        password,
        error,
      },
    });

    }

  });
}

export async function signUp( userName, password ){
  return( async (dispatch, getState) => {
    dispatch({
      type: authTypes.TRYING_TO_SIGN_UP,
      payload: {
        userName,
        password,
      },
    });
    //TODO Replace with acuall SignUpCode
    try {
      await timeout(1000);
      let user = { uid: "123456", name: "Test" };
      dispatch({
        type: authTypes.SIGN_UP_SUCESSFULL,
        payload: {
          userName,
          password,
          user,
        },
      });
      //Actuall signup might be called differently
      dispatch(signIn(userName, password));
    } catch(error) {
    dispatch({
      type: authTypes.SIGN_UP_FAILED,
      payload: {
        userName,
        password,
        error,
      },
    });
    }
  });
}

export async function signOut(){
  return( async (dispatch, getState) => {
    //DO Stuff on server to sign user out
    dispatch( { type: authTypes.USER_SIGNED_OUT } )

  });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function processedWithoutAccount(){
  return ( async (dispatch, getState) => {
    dispatch({type: authTypes.PROCEED_WITHOUT_LOGIN });
  });
}
