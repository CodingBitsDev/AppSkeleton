import * as React from 'react';
import { connect } from "react-redux"; 
import { View, Text,} from 'react-native';

import Button from "reuse/Button.js";

import { SafeAreaView } from 'react-native-safe-area-context';

import { openHomeScreen2, openPopup } from "../actions/navActions.js";
import { signOut } from "../actions/authActions.js";

import MessageBoxPopup from "../screens/Popups/MessageBoxPopup.js";

import getTheme from "theme/index.js";

function HomeScreen(props) {
  let { colors, styles: defaultStyles, icons, fonts, images } = getTheme();

  return (
    <SafeAreaView style={{backgroundColor: colors.backgroundColor, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        onPress={ () => { props.navigation.dispatch(openHomeScreen2()) } }
        title="Open Home Screen 2"
        primary
      />
      <Button
        onPress={ () => { props.dispatch(openPopup(props.navigation, popupContent(props), {closeOnBackPress : true, closeOnOutsidePress: true} )) } }
        title="Open Popup"
        warning
      />
      <Button
        onPress={ () => { props.dispatch(signOut()) }}
        title="SignOut"
        danger
      />
    </SafeAreaView>
  );
}

function popupContent(props){
  return (
    <MessageBoxPopup />
  );
}

export default connect((store) => {
  return {
  };
})(HomeScreen);
