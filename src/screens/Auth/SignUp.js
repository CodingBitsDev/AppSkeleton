import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Button, Dimensions, StyleSheet, View, Text, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { signUp } from "../../actions/authActions.js";

function SignUp( { navigation, route, ...props} ){
  return(
    <SafeAreaView style={[{ flex: 1, justifyContent: "center", alignItems:"center"}]}>
      <Button
        containerStyle={[{margin: 20}]}
        onPress={ () => { props.signInActive || props.dispatch(signUp()) } }
        title="Sign Up"
        color={props.signInActive ? "grey" : "#841584" }
        disabled={props.signInActive}
      />
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
    signUpActive: store.authReducer.signUpState.signUpActive,
  };
})(SignUp);



