//Libraries
import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux"; //Gets the data from the store and pushes them into the this.props of the component


//Components
import { ScrollView, StatusBar, Image,  Platform, KeyboardAvoidingView, Dimensions, StyleSheet, View, Text, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

import Button from "../../reuse/Button.js";
import IconTextInput from "../../reuse/IconTextInput.js";

//Actions
import { openSignInScreen, openSignUpScreen } from "../../actions/navActions.js";
import { signIn } from "../../actions/authActions.js";

//CusomHooks
import useWindowSize from "../../hooks/useWindowSize.js";

//HelperFunctions
import getTheme from "../../constants/theming/theme.js";
import translate from '../../constants/language/languages.js';

function SignIn( { navigation, route, ...props} ){
  let [ userName, setUserName ] = useState("");
  let [ password, setPassword ] = useState("");
  let {width, height} = useWindowSize(); //Only works in browser
  let { containerHeight, containerWidth } = { containerHeight: Dimensions.get("window").width, containerWidth: Dimensions.get("window").height  }

  let { colors, styles: defaultStyles, icons, fonts } = getTheme();

  let styles = {
    containerStyle: {
      ...defaultStyles.container,
      justifyContent: "center",
    },
    imageStyle: {
      maxHeight: height * 0.4,
      minWidth: 300,
      width: width - 100,
      height: (width - 100) * 0.75,
      resizeMode: "contain",
    },
    textInputStyle: {
      backgroundColor: "rgba( 255, 255, 255, 1.0 )",
      marginTop: 20,
      minWidth: width * 0.7 < 400 ? width * 0.7 : 400,
      height: 50, 
      ...defaultStyles.roundConers.rounded, 
    },
    textInputContainer: {
      marginBottom: Platform.OS == "web" ? 175 :  containerHeight * 0.1,
      alignItems: "center",
      width: width,
      flex: 0,
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
    <SafeAreaView style={[ styles.containerStyle ]} >
      <Image
        style={[ styles.imageStyle ]}
        source={require('../../../assets/Logo/cover-white.png')}
      />
      <View style={ styles.textInputContainer } >
        <IconTextInput
          onChangeText={ setUserName }
          value={userName}
          style={{ ...styles.textInputStyle, }} 
          icon={(<Icon name='user-circle-o' type="font-awesome" />)}
          placeholder="UserName"
        />
        <IconTextInput
          onChangeText={ setPassword }
          value={password}
          secureTextEntry
          style={{ ...styles.textInputStyle, }} 
          icon={(
            <View 
              style={[
                { borderWidth: 1.5, borderColor: "black", height: 25, width: 25, alignItems: "center", justifyContent: "center" },
                defaultStyles.roundConers.rounded
              ]}>
              <Icon solid="false" name='lock' type="font-awesome" />
            </View>
          )}
          placeholder="Password"
        />
      </View>
      <Button
        onPress={ () => { props.dispatch( signIn( userName, password ) ) } }
        title={translate( "WelcomeScreen_Sign_In" )}
        colors={ [colors.primary, colors.primaryVariants[4], colors.primaryVariants[2],] }
        textStyle={[{color: "white"}]}
        primary
        rounded
        containerStyle={{ margin: 20 }}
      />
    </SafeAreaView>
  )
}

export default connect((store) => {
  return {
    signInActive: store.authReducer.signInState.signInActive,
  };
})(SignIn);

