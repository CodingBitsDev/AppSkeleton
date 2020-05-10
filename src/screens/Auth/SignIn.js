import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Button, Dimensions, StyleSheet, View, Text, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { signIn } from "../../actions/authActions.js";

function SignIn( { navigation, route, ...props} ){
  console.log(props)
  return(
    <SafeAreaView style={[{ flex: 1, justifyContent: "center", alignItems:"center"}]}>
      <Button
        onPress={ () => { props.signInActive || props.dispatch(signIn()) } }
        title="Sign In"
        color={props.signInActive ? "grey" : "#841584" }
        disabled={props.signInActive}
      />
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
    signInActive: store.authReducer.signInState.signInActive,
  };
})(SignIn);


