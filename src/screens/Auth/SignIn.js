//Libraries
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component
import PropTypes from 'prop-types';


//Components
import { Image,  Dimensions, View, Text, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

import Button from "reuse/Button.js";
import IconTextInput from "reuse/IconTextInput.js";

//Actions
import { signIn, } from "../../actions/authActions.js";

//CusomHooks
import useWindowSize from "../../hooks/useWindowSize.js";

//HelperFunctions
import getTheme, {THEMES} from "theme/index.js";
import translate from '../../constants/language/languages.js';

function SignIn( { navigation, route, ...props} ){
  let [ userName, setUserName ] = useState("");
  let [ password, setPassword ] = useState("");
  let [ localWaring, setLocalWarning ] = useState("");
  let [ localError, setLocalError ] = useState("");
  let {width, height} = useWindowSize(); //Only works in browser
  let { containerHeight, containerWidth } = { containerHeight: Dimensions.get("window").width, containerWidth: Dimensions.get("window").height  }

  let { colors, styles: defaultStyles, icons, fonts, images } = getTheme(  );

  function checkNameForWarning( userName ) {
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
      return; 
    }
    if (password.length >= 6){
      setLocalWarning("")
      setLocalError("")
      return;
    }
    setLocalWarning("Password should have at least length of 6");
    return 0;
  }


  let styles = {
    containerStyle: {
      ...defaultStyles.container,
    },
    imageStyle: {
      marginTop: height * 0.1,
      maxHeight: height * 0.4,
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
    navigation.setOptions({
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
          onChangeText={ (username) => { checkNameForWarning(username); setUserName(username) } }
          value={userName}
          style={{ ...styles.textInputStyle, }} 
          icon={(
            <Icon
              name='user-circle-o'
              type="font-awesome"
              color={userName != "" ? getIconColor(userNameOK(userName), colors) : colors.mainTextInputTextColor } 
            />
          )}
          placeholder={translate("SignIn_Username")}
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
                  height: 25, width: 25, alignItems: "center", justifyContent: "center" 
              }, defaultStyles.roundConers.rounded ]}>
              <Icon 
                solid="false" name='lock'
                type="font-awesome" 
                color={password != "" ? getIconColor(passwordOK(password), colors) : colors.mainTextInputTextColor } 
              />
            </View>
          )}
          placeholder={translate("SignIn_Password")}
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
          title={translate( "SignIn_SignIn" )}
          colors={ [colors.primary, colors.primaryVariants[4], colors.primaryVariants[2],] }
          textStyle={[{ color: colors.primaryButtonColor }]}
          primary
          rounded
          disabled={props.signInActive || !userNameOK(userName) || !passwordOK(password)}
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


function getIconColor( warningState, colors ){
  return warningState > -1 ? warningState > 0 ? colors.success : colors.warning : colors.danger; 
}

SignIn.propTypes = {
  wariningText: PropTypes.string,
  errorText: PropTypes.string,
  signInActive: PropTypes.bool,
  //Should be introduced by Redux connect function
  dispatch: PropTypes.function,
  //Should be introduced by Navigation
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default connect((store) => {
  return {
    signInActive: store.authReducer.signInState.signInActive,
    wariningText: store.authReducer.signInWarning,
    errorText: store.authReducer.signInError,
  };
})(SignIn);

