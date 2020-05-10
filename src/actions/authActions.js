export async function setNotSignedIn(){
  return( (dispatch, getState) => {
    dispatch({
      type: "NOT_SIGNED_IN",
    });
  });
}

