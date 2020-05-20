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


export default function useNavActions() {
  const navigation = useNavigation();
  
  let navigate = ( screenName, screenKey, params ) => {
    let reducerState = store.getState();
    let dispatch = store.dispatch;

    let navAction = CommonActions.navigate({
      name: screenName,
      key: screenKey || screenName,
      params: {
        ...getParams( screenName, reducerState, params ),
      }
    });
    navigation.dispatch( navAction )
  };


  return navigate
}

