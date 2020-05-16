import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import { ScrollView, StatusBar, Image, TextInput, Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from "../../reuse/Button.js";
import IconTextInput from "../../reuse/IconTextInput.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { openSignInScreen, openSignUpScreen } from "../../actions/navActions.js";

import getTheme from "../../constants/theming/theme.js";

import useWindowSize from "../../hooks/useWindowSize.js";

import translate from '../../constants/language/languages.js';

function WelcomeScreen( { navigation, route, ...props} ){
  let {width, height} = useWindowSize(); //Only works in browser
  let { containerHeight, containerWidth } = { containerHeight: Dimensions.get("window").width, containerWidth: Dimensions.get("window").height  }

  let { colors, styles: defaultStyles, icons, fonts } = getTheme();

  let styles = {
    containerStyle: { 
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    scrollViewStyle: { 
      flex: 1,
      width,
    },
    imageBG: {
      width: width,
      height: height,
      resizeMode: "cover",
      opacity: 0.5,
      position: "absolute"
    },
    imageStyle: {
      maxHeight: height * 0.4,
      minWidth: 300,
      width: width - 100,
      height: width - 100,
      resizeMode: "contain",
      marginTop: height * 0.1,
    },
    elementContainer: {
      marginTop: width > 400 ? height * 0.15: 0,
      marginHorizontal: Platform.OS == "web" ? 15 : 20,
      minheight: height - height * 0.55 - ( Platform.OS != "web" ? (height - containerHeight) : 0 ),
      justifyContent: "flex-start", 
      alignItems: "center", 
      flex: 1,
    },
    introTextStyle: {
      color: "white",
      marginBottom: height * 0.10,
      fontFamily: fonts.standard,
      fontSize: 16,
    },
  }

  return(
    <SafeAreaView style={[ styles.containerStyle ]} >
      <StatusBar translucent backgroundColor={colors.backgroundColor} barStyle={"light-contents"}/>
      <Image
        style={[ styles.imageBG ]}
        source={require('../../../assets/testBGImage.jpg')}
      />
      <ScrollView contentContainerStyle={{ alignItems: "center", height, flex: 1}} style={[ styles.scrollViewStyle ]}>
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
            containerStyle={{ marginBottom: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
  };
})(WelcomeScreen);

