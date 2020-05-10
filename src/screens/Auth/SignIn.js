import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Button, Dimensions, StyleSheet, View, Text, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { signIn } from "../../actions/authActions.js";
import { openSignUpScreen } from "../../actions/navActions.js";

function SignIn( { navigation, route, ...props} ){
  return(
    <SafeAreaView style={[{ flex: 1, justifyContent: "center", alignItems:"center"}]}>
      <Button
        containerStyle={[{margin: 20}]}
        onPress={ () => { props.signInActive || props.dispatch(signIn()) } }
        title="Sign In"
        color={props.signInActive ? "grey" : "#841584" }
        disabled={props.signInActive}
      />
      <Button
        containerStyle={[{margin: 20}]}
        onPress={ () => { navigation.dispatch(openSignUpScreen()) } }
        title="SignUp"
        color="#841584"
      />
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
    signInActive: store.authReducer.signInState.signInActive,
  };
})(SignIn);

