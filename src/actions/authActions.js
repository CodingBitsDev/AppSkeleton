export async function setNotSignedIn(){
  return( (dispatch, getState) => {
    dispatch({
      type: "NOT_SIGNED_IN",
    });
  });
}

export async function signIn( userName, password ){
  return( async (dispatch, getState) => {
    dispatch({
      type: "TRYING_TO_SIGN_IN",
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
        type: "SIGN_IN_SUCESSFULL",
        payload: {
          userName,
          password,
          user,
        },
      });

    } catch(error) {
    dispatch({
      type: "SIGN_IN_FAILED",
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
      type: "TRYING_TO_SIGN_UP",
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
        type: "SIGN_UP_SUCESSFULL",
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
      type: "SIGN_UP_FAILED",
      payload: {
        userName,
        password,
        error,
      },
    });

    }

  });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
