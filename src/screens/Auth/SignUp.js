import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Dimensions, StyleSheet, View, Text, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function SignUp( { navigation, route, ...props} ){
  return(
    <SafeAreaView style={[{ flex: 1, justifyContent: "center", alignItems:"center"}]}>
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
  };
})(SignUp);



