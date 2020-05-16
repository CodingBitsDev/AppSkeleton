import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { BackHandler, Dimensions, StyleSheet, View, Text,TouchableWithoutFeedback,} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { CommonActions } from '@react-navigation/native';

function Popup( { navigation, route, ...props } ){
  let params = route && route.params || {};
  let {closeOnOutsidePress, closeOnBackPress} = params;

  let content = null;
  if (props.popupContent){
    content = React.cloneElement(
      props.popupContent, 
      { navigation: navigation }
    );
  }
  else {
    console.warn("PopupContent not Set")
    goBack(navigation)
  }

  useEffect( () => {
    let backAction = () => {
      closeOnBackPress && navigation.goBack();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => { BackHandler.removeEventListener( 'hardwareBackPress', backAction ) }
  }, [])

  return(
    <View style={[{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.0)', justifyContent: "center", alignItems:"center"}]}>
      <TouchableWithoutFeedback style={{...StyleSheet.absoluteFillObject}} onPress={() => { closeOnOutsidePress && navigation.goBack() }}>
        <View style={[{...StyleSheet.absoluteFillObject ,backgroundColor: "rgba(0, 0, 0, 0.0)"}]} />
      </TouchableWithoutFeedback>
      <View style={[{backgroundColor: "transparent", borderRadius: 10, overflow: "hidden"}]}>
        { content } 
      </View>
    </View>
  )
}

function goBack( navigation ){
  if (navigation.canGoBack()){
    navigation.pop();
  }
  else {
    navigation.replace(navigation.dangerouslyGetState().routeNames[0]);
  }
}

export default connect((store) => {
  return {
    popupContent: store.popupReducer.popupContent,
  };
})(Popup);

