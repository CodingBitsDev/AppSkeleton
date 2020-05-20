import { CommonActions } from '@react-navigation/native';

//**********************
//*****ReduxActions*****
//**********************
export async function setNavState( navState ){
  return( (dispatch, getState) => {
    dispatch({
      type: "NAV_STATE_CHANGED",
      payload: {
        navState,
      }
    });
  });
}
