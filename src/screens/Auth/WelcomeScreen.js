import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { StatusBar, Image, TextInput, Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from "../../reuse/Button.js";
import IconTextInput from "../../reuse/IconTextInput.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { openSignInScreen, openSignUpScreen } from "../../actions/navActions.js";

import getTheme from "../../constants/theming/theme.js";

import useWindowSize from "../../hooks/useWindowSize.js";

import translate from '../../constants/language/languages.js';

function WelcomeScreen( { navigation, route, ...props} ){
  let dimensions = useWindowSize(); //Only works in browser
  let {width, height} = dimensions || {width: Dimensions.get("screen").width, height: Dimensions.get("screen").height };
  let { containerHeight, containerWidth } = { containerHeight: Dimensions.get("window").width, containerWidth: Dimensions.get("window").height  }

  let { colors, styles: defaultStyles, icons, fonts } = getTheme();

  let styles = {
    containerStyle: { 
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    imageBG: {
      width: width,
      height: height,
      resizeMode: "cover",
      opacity: 0.5,
    },
    imageStyle: {
      maxHeight: height * 0.5,
      minWidth: 300,
      width: width - 100,
      height: width - 100,
      resizeMode: "contain",
      position: "absolute",
      top: height * 0.1,
    },
    elementContainer: {
      position: "absolute",
      top: height * 0.50,
      marginTop: width > 400 ? height * 0.15: 0,
      marginHorizontal: 20,
      height: height - height * 0.55 - ( Platform.OS != "web" ? (height - containerHeight) : 0 ),
      justifyContent: "flex-start", 
      alignItems: "center", 
    },
    introTextStyle: {
      color: "white",
      //marginTop: height* 0.10,
      marginBottom: height * 0.10,
      fontFamily: fonts.standard,
      fontSize: 16,
    },
  }
  console.log(width > 400 ? width > height ? height * 0.15: height * 0.15 - (height - 400  - width) : 0,)

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
        <Text style={[styles.introTextStyle]}> {translate("WelcomeScreen_WelcomeText")} </Text>
        <Button
          onPress={ () => { navigation.dispatch(openSignInScreen()) } }
          title={translate( "WelcomeScreen_Sign_In" )}
          colors={ [colors.primary, colors.primaryVariants[4], colors.primaryVariants[2],] }
          textStyle={[{color: "white"}]}
          primary
          rounded
        />
        <View style={[{minHeight: 20}]}/>
        <Button
          onPress={ () => { navigation.dispatch(openSignUpScreen()) } }
          title={translate( "WelcomeScreen_Sign_Up" )}
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

