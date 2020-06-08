import React, { useState, useEffect } from 'react';
import { useNavigation, CommonActions  } from '@react-navigation/native';

import store from "src/configs/store.js";


export default function useOpenPopup() {
  let navigation = { dispatch: (action) => {console.warn("No navigation set but called:", action)} };
  try {
    navigation = useNavigation();
  } catch(e){
    console.warn(e)
  }
  
  let openPopup = ( content, extraData ) => {
    let { closeOnOutsidePress, closeOnBackPress } = extraData || {};

    let reducerState = store.getState();
    let dispatch = store.dispatch;

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

  };

  return openPopup
}
