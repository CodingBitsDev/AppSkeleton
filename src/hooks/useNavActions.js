import React, { useState, useEffect } from 'react';
import { useNavigation, CommonActions  } from '@react-navigation/native';

import store from "src/configs/store.js";

function getParams( screeName, reducerState, params ){
  let outParams = {};
  switch (screeName) {
    default:
      outParams = {...params};
      break;
  }
  return outParams;
}


export default function useNavActions( ) {
  let navigation = { dispatch: (action) => {console.warn("No navigation set but called:", action)} };
  try {
    navigation = useNavigation();
  } catch(e){
    console.warn(e)
  }
  
  let navigate = ( screenName, screenKey, params ) => {
    let reducerState = store.getState();

    navigation.dispatch(CommonActions.navigate({
      name: screenName,
      key: screenKey || screenName,
      params: {
        ...getParams( screenName, reducerState, params ),
      }
    }))
  };


  return navigate
}

//!!! Waring !!!
//USE NOT ADVICED
//The following function should only be used if you are using non functional components and don't have acess to hooks
let _navigation = null;

export function setNavigation( navigation ){
  _navigation = navigation;
}

export function navigate( screenName, screenKey, params ){
  //Get Necessary variables
  const navigation = _navigation;
  if (navigation == null){
    console.warn( "Before calling navigate the navigation object needs to be set via the setNavigation function" );
    return;
  }

  let reducerState = store.getState();

  navigation.dispatch(CommonActions.navigate({
    name: screenName,
    key: screenKey || screenName,
    params: {
      ...getParams( screenName, reducerState, params ),
    }
  }))
}
