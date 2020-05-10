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

export function goBackAndOpen( navAction ){
  return( (dispatch, getState) => {
    let { viewReducer } = getState();
    let navStack = viewReducer.navStack;

    if (Array.isArray(navStack) && navStack.length >= 2){
      //If Not a function taking a dispatch but a direct Action Object
      if (typeof(navAction) === 'object'){
        //If navAction reset by one and open
        if (navAction.type == "NAVIGATE"){
          let index = navStack.length;
          let newNavStack = navStack.slice(0, index - 1);
          if (newNavStack[newNavStack.length - 1].key != navAction.payload.key){
            newNavStack.push({
              name: navAction.payload.name,
              key: navAction.payload.key,
              params: navAction.payload.params
            });
          }
          dispatch(CommonActions.reset({
            index: index,
            routes: newNavStack,
          }));
        }
        else {
          dispatch(navAction);
        }
      }
      else{
        navAction( ( smallerNavAction ) => { dispatch(goBackAndOpen( smallerNavAction )) }, getState );
      }
    }
    else{
      dispatch(navAction);
    }
  })
}

export function openPopup(navigation, content, data){
  let { closeOnOutsidePress, closeOnBackPress } = data || {};
  return( (dispatch, getState) => {
    dispatch({
      type:"SET_POPUP_CONTENT",
      payload: {
        content: content || null,
      },
    })    
    navigation.dispatch(CommonActions.navigate({
      name: 'Popup',
      key: 'Popup',
      params: {
        closeOnOutsidePress: closeOnOutsidePress != undefined ? closeOnOutsidePress :  true,
        closeOnBackPress: closeOnBackPress != undefined ? closeOnBackPress : true,
      }
    }));
  });
}


//************************
//*****PureNavActions*****
//************************

//MainScreens
export function openHomeScreen() {
  return CommonActions.navigate({
    name: 'HomeScreen',
    key: 'HomeScreen',
    params: {
    }
  });
}

export function openHomeScreen2() {
  return CommonActions.navigate({
    name: 'HomeScreen2',
    key: 'HomeScreen2',
    params: {
    }
  });
}

// AuthScreens
export function openSignInScreen() {
  return CommonActions.navigate({
    name: 'SignIn',
    key: 'SignIn',
    params: {
    }
  });
}
export function openSignUpScreen() {
  return CommonActions.navigate({
    name: 'SignUp',
    key: 'SignUp',
    params: {
    }
  });
}

