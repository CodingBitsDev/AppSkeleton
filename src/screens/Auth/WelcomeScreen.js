import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { StatusBar, Image, TextInput, Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from "../../reuse/Button.js";
import IconTextInput from "../../reuse/IconTextInput.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { openSignInScreen, openSignUpScreen } from "../../actions/navActions.js";

import getTheme from "../../constants/theming/theme.js";

import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import ReactResizeDetector from 'react-resize-detector';

function WelcomeScreen( { navigation, route, ...props} ){
  let [dimensions, setDimension] = useState( null );
  let {width, height} = dimensions || {width: Dimensions.get("screen").width, height: Dimensions.get("screen").height };
  useEffect ( () => {
    Platform.OS == "web" && window.addEventListener('resize', (data) => setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })); 
  }, [] )
  let { colors, styles: defaultStyles, icons } = getTheme();

  let styles = {
    containerStyle: { 
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    imageStyle: {
      minWidth: 300,
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
    elementContainer: {
      position: "absolute",
      top: height * 0.55,
      justifyContent: "center", 
      alignItems: "center", 
    },
    imageBG: {
      width: width,
      height: height,
      resizeMode: "cover",
      opacity: 0.5,
      //position: "absolute",
      //top: 0,
      //right: 0,
    }
  }

  return(
    <SafeAreaView style={[ styles.containerStyle ]} >
      <Image
        style={[ styles.imageBG ]}
        source={require('../../../assets/testBGImage.jpg')}
      />
      <StatusBar translucent backgroundColor={colors.backgroundColor} barStyle={"light-contents"}/>
      <Image
        style={[ styles.imageStyle ]}
        source={require('../../../assets/Logo/cover-white.png')}
      />
      <View style={[ styles.elementContainer ]}>
        <Text style={[styles.introTextStyle]}> Welcome To AppSkeleton. This Project Tries to Add all necessary Parts together that are usefull for any type of App </Text>
        <Button
          onPress={ () => { navigation.dispatch(openSignInScreen()) } }
          title="Sign In"
          colors={ [colors.primary, colors.primaryVariants[4], colors.primaryVariants[2],] }
          textStyle={[{color: "white"}]}
          primary
          rounded
        />
        <View style={[{minHeight: 20}]}/>
        <Button
          onPress={ () => { navigation.dispatch(openSignUpScreen()) } }
          title=" Register "
          primary
          transparent
          block
        />
      </View>
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
  };
})(WelcomeScreen);

