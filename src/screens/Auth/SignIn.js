import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Platform, KeyboardAvoidingView, Button, Dimensions, StyleSheet, View, Text, } from 'react-native';

import OwnButton from "../../reuse/Button.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { signIn } from "../../actions/authActions.js";
import { openSignUpScreen } from "../../actions/navActions.js";

function SignIn( { navigation, route, ...props} ){
  return(
    <View style={[{ flex: 1, justifyContent: "space-around", alignItems: "center", backgroundColor:"black" }]} >
        <Button
          onPress={ () => { props.signInActive || props.dispatch(signIn()) } }
          title="Sign In"
          color={props.signInActive ? "grey" : "#841584" }
          disabled={props.signInActive}
        />
        <Button
          onPress={ () => { navigation.dispatch(openSignUpScreen()) } }
          title="SignUp"
          color="#841584"
        />
        <OwnButton title="Transparent" primary transparent onPress={ () => { navigation.dispatch(openSignUpScreen()) } } />
        <OwnButton title="Outlined" primary outlined/>
        <OwnButton title="Disabled" disabled />
        <OwnButton title="Primary" primary />
        <OwnButton title="Secondary" secondary />
        <OwnButton title="Info" info />
        <OwnButton title="Sucess" success />
        <OwnButton title="Warning" warning />
        <OwnButton title="Danger" danger />
        <OwnButton title="PrimaryRounded" primary rounded />
    </View>
    /*
     *
  if (disabled){
    btnColor = colors.disabled;
  } else if (primary){
    btnColor = colors.primary;
  } else if (secondary){
    btnColor = colors.secondary;
  } else if (success){
    btnColor = colors.success;
  } else if (danger){
    btnColor = colors.danger;
  } else if (warning){
    btnColor = colors.warning;
  } else if (info){
    btnColor = colors.info;
  }
    */
  )
}

export default connect((store) => {
  return {
    signInActive: store.authReducer.signInState.signInActive,
  };
})(SignIn);

