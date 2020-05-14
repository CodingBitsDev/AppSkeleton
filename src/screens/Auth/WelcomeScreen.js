import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { Image, TextInput, Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from "../../reuse/Button.js";
import IconTextInput from "../../reuse/IconTextInput.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { openSignUpScreen } from "../../actions/navActions.js";

import getTheme from "../../constants/theming/theme.js";


function WelcomeScreen( { navigation, route, ...props} ){
  let {width, height} = Dimensions.get("window");
  let { colors, styles: defaultStyles, icons } = getTheme();

  let styles = {
    containerStyle: { 
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor:"black",
      height,
      width,
    },
    imageStyle: {
      width: width - 100,
      height: Platform.OS == "web" ? 400 : 200,
      resizeMode: "contain",
      marginTop: "10%",
      position: "absolute",
      top: height * 0.1 - (Platform.OS == "web" ? 200 : 0 ),
    },
    introTextStyle: {
      color: "white",
      marginBottom: height* 0.10,
      marginHorizontal: 30,
    },
    buttonStyle: {
      marginTop: "10%",
    },
    elementContainer: {
      position: "absolute",
      top: height * 0.65,
      justifyContent: "space-around",
    }
  }

  return(
    <SafeAreaView style={[ styles.containerStyle ]} >
      <Image
        style={[ styles.imageStyle ]}
        source={require('../../../assets/Logo/cover-white.png')}
      />
      <View style={[ styles.elementContainer ]}>
        <Text style={[styles.introTextStyle]}> Welcome To AppSkeleton. This Project Tries to Add all necessary Parts together that are usefull for any type of App </Text>
        <Button
          onPress={ () => { console.log("signInPressed") } }
          title="Sign In"
          colors={ [colors.primary, "#4d0f70", colors.primary,] }
          textStyle={[{color: "white"}]}
          primary
          rounded
        />
        <View style={[{minHeight: 20}]}/>
        <Button
          onPress={ () => { console.log("registerPressed") } }
          title=" Register "
          primary
          transparent
          rounded
        />
      </View>
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
  };
})(WelcomeScreen);

