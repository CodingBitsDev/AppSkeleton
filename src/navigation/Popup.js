import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Dimensions, StyleSheet, View, Text,TouchableWithoutFeedback,} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function Popup( props ){
  let navigation = props.navigation;
  let params = ( props.route && props.route.params ) || {};
  let {closeOnOutsideClick} = params;

  let content = React.cloneElement(
    params.content || null, 
    { navigation: props.navigation }
  );

  return(
    <View style={[{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.0)', justifyContent: "center", alignItems:"center"}]}>
      <TouchableWithoutFeedback style={{...StyleSheet.absoluteFillObject}} onPress={() => { closeOnOutsideClick && navigation.goBack() }}>
        <View style={[{...StyleSheet.absoluteFillObject ,backgroundColor: "rgba(0, 0, 0, 0.0)"}]} />
      </TouchableWithoutFeedback>
      <View style={[{backgroundColor: "transparent", borderRadius: 10, overFlow: "hidden"}]}>
        { content } 
      </View>
    </View>
  )
}

export default connect((store) => {
  return {
  };
})(Popup);

