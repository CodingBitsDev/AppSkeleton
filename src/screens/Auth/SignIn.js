import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { TextInput, Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from "../../reuse/Button.js";
import IconTextInput from "../../reuse/IconTextInput.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { signIn } from "../../actions/authActions.js";
import { openSignUpScreen } from "../../actions/navActions.js";

function SignIn( { navigation, route, ...props} ){
  return(
    <View style={[{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"white" }]} >
      <IconTextInput style={{ backgroundColor: "white" }} icon={(<Icon name='rowing' />)} />
      <Button
        onPress={ () => { props.signInActive || props.dispatch(signIn()) } }
        title="Sign In"
        color={props.signInActive ? "grey" : "#841584" }
        disabled={props.signInActive}
        containerStyle={[{margin: 10}]}

      />
      <Button
        onPress={ () => { navigation.dispatch(openSignUpScreen()) } }
        title="Sign Up"
        color="#841584"
        containerStyle={[{margin: 10}]}
      />
    </View>
  )
}

export default connect((store) => {
  return {
    signInActive: store.authReducer.signInState.signInActive,
  };
})(SignIn);

