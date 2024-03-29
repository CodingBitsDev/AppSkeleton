//Libraries
import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import PropTypes from 'prop-types';


//Components
import { ScrollView, StatusBar, Image,  Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';


import Button from "reuse/Button.js";
import IconTextInput from "reuse/IconTextInput.js";

//Actions
import { openSignInScreen, openSignUpScreen } from "src/actions/navActions.js";
import { signIn } from "src/actions/authActions.js";

//CusomHooks
import useWindowSize from "../../hooks/useWindowSize.js";

//HelperFunctions
import getTheme from "theme/index.js";
import translate from '../../constants/language/languages.js';

function SignUp( { navigation, route, ...props} ){
  let [ userName, setUserName ] = useState("");
  let [ password, setPassword ] = useState("");
  let [ repeatPassword, setRepeatPassword ] = useState("");
  let [ localWaring, setLocalWarning ] = useState("");
  let [ localError, setLocalError ] = useState("");

  let {width, height} = useWindowSize(); //Only works in browser
  let { containerHeight, containerWidth } = { containerHeight: Dimensions.get("window").width, containerWidth: Dimensions.get("window").height  }

  let { colors, styles: defaultStyles, icons, fonts, images } = getTheme();

  function checkNameForWarning( userName ){
    if (userName.includes(".")){
      setLocalError( "The following sign is not allowed in the username: \".\"");
      return;
    }
    if (userName.length >= 3){
      setLocalWarning("")
      setLocalError("")
      return;
    }
    setLocalWarning("Username should have at least length of 3");
  }

  function checkPasswordForWarining( password ){
    //SET when there are breaking password rules
    let errorCase = false;
    if ( errorCase ){
      setLocalError( "Some Password Error");
      return;
    }
    if (password.length >= 6){
      setLocalWarning( "");
      setLocalError( "");
      return;
    }
    setLocalWarning( "The Password must be at least 6 signs long");
    return;
  }

  function checkRepeatPassowrdForWarning( password, repeatPassword ){
    if (repeatPassword.length < 6){
      return;
    }
    if (password == repeatPassword){
      setLocalError( "");
      return;
    }
    setLocalError( "Passwords no not match");
    return -1;
  }

  let styles = {
    containerStyle: {
      ...defaultStyles.container,
    },
    imageStyle: {
      marginTop: height * 0.1,
      maxHeight: height * 0.3,
      minWidth: 300,
      width: width - 100,
      height: (width - 100) * 0.75,
      resizeMode: "contain",
    },
    textInputStyle: {
      backgroundColor: colors.mainTextInputColor,
      marginTop: 20,
      minWidth: width * 0.7 < 400 ? width * 0.7 : 400,
      height: 50, 
      ...defaultStyles.roundConers.rounded, 
    },
    textInputContainer: {
      alignItems: "center",
      width: width,
      flex: 0,
    },
    wariningText: {
      marginTop: 10,
      color: colors.warning,
      fontSize: 20,
      fontFamily: fonts.standard,
      marginHorizontal: 40,
    },
    errorText: {
      marginTop: 10,
      color: colors.danger,
      fontSize: 20,
      fontFamily: fonts.standard,
      marginHorizontal: 40,
    },
  }

  useEffect( () => {
    navigation && navigation.setOptions({
      headerTransparent: true,
      headerTintColor: colors.mainTextColor,
      headerTitle: "",
    })
  }, [] )

  return(
    <SafeAreaView style={ styles.containerStyle } >
      <Image
        style={ styles.imageStyle }
        source={images.mainLogo}
      />
      <View style={ styles.textInputContainer } >
        <IconTextInput
          onChangeText={ userName => { checkNameForWarning(userName); setUserName(userName) } }
          value={userName}
          style={{ ...styles.textInputStyle, }} 
          icon={(
            <Icon
              color={userName != "" ? getIconColor(userNameOK(userName), colors) : colors.mainTextInputTextColor } 
              name='user-circle-o'
              type="font-awesome"
            />)}
          placeholder={translate("SignUp_Username")}
          placeholderTextColor={colors.mainTextInputPlaceholderColor}
        />
        <IconTextInput
          onChangeText={ password => { checkPasswordForWarining(password); setPassword(password) } }
          value={password}
          secureTextEntry
          style={{ ...styles.textInputStyle, }} 
          icon={(
            <View 
              style={[{ borderColor: password != "" ? getIconColor(passwordOK(password), colors) : colors.mainTextInputTextColor,
                  borderWidth: 1.5, 
                  height: 25,
                  width: 25,
                  alignItems: "center",
                  justifyContent: "center" 
              }, defaultStyles.roundConers.rounded ]}
            >
              <Icon 
                color={password != "" ? getIconColor(passwordOK(password), colors) : colors.mainTextInputTextColor}
                name='lock'
                type="font-awesome"
              />
            </View>
          )}
          placeholder={translate("SignUp_Password")}
          placeholderTextColor={colors.mainTextInputPlaceholderColor}
        />
        <IconTextInput
          onChangeText={ repeatPw => { checkRepeatPassowrdForWarning(password, repeatPw); setRepeatPassword(repeatPw) } }
          value={repeatPassword}
          secureTextEntry
          style={{ ...styles.textInputStyle, }} 
          icon={(
            <View 
              style={[{ borderColor: repeatPassword != "" ? getIconColor(repeatPasswordOK(password, repeatPassword), colors) : colors.mainTextInputTextColor,
                  borderWidth: 1.5, 
                  height: 25,
                  width: 25,
                  alignItems: "center",
                  justifyContent: "center" 
              }, defaultStyles.roundConers.rounded ]}
            >
              <Icon 
                color={repeatPassword != "" ? getIconColor(repeatPasswordOK(password, repeatPassword), colors) : colors.mainTextInputTextColor}
                name='lock'
                type="font-awesome"
              />
            </View>
          )}
          placeholder={translate("SignUp_RepeatPassword")}
          placeholderTextColor={colors.mainTextInputPlaceholderColor}
        />
        { localWaring || props.wariningText ? (
          <Text style={styles.wariningText}>{ localWaring || props.errorText }</Text>
        ) : null }
        { localError || props.errorText ? (
          <Text style={styles.errorText}>{ localError || props.errorText }</Text>
        ) : null }
        <Button
          onPress={ () => { props.dispatch( signIn( userName, password ) ) } }
          title={translate( "SignUp_SignUp" )}
          colors={ [colors.primary, colors.primaryVariants[4], colors.primaryVariants[2],] }
          textStyle={{color: colors.primaryButtonColor}}
          primary
          rounded
          disabled={props.signUpActive || !userNameOK(userName) || !passwordOK(password) || !repeatPasswordOK(password, repeatPassword)}
          containerStyle={{ margin: 20 }}
        />
      </View>
    </SafeAreaView>
  )
}

function userNameOK( userName ){
  if (userName.includes(".")){
    return -1;
  }
  if (userName.length >= 3){
    return 1;
  }
  return 0;
}

function passwordOK( password ){
  //SET when there are breaking password rules
  let errorCase = false;
  if ( errorCase ){
    return -1;
  }
  if (password.length >= 6){
    return 1;
  }
  return 0;
}

function repeatPasswordOK( password, repeatPassword ){
  if (repeatPassword.length < 6){
    return 0;
  }
  if (password == repeatPassword){
    return 1;
  }
  return -1;
}

function getIconColor( warningState, colors ){
  return warningState > -1 ? warningState > 0 ? colors.success : colors.warning : colors.danger; 
}

SignUp.propTypes = {
  wariningText: PropTypes.string,
  errorText: PropTypes.string,
  signUpActive: PropTypes.bool,
  //Should be introduced by Redux connect function
  dispatch: PropTypes.function,
  //Should be introduced by Navigation
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default connect((store, ownProps) => {
  return {
    signUpActive: store.authReducer.signUpState.signUpActive,
    wariningText: store.authReducer.signUpWarning,
    errorText: store.authReducer.signUpError,
  };
}, null , (stateProps, dispatchProps, ownProps) => ({...stateProps, ...dispatchProps, ...ownProps}))(SignUp);
