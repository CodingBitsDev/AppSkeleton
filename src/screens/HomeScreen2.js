import * as React from 'react';
import { connect } from "react-redux"; 

import { View, Text, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "reuse/Button.js";

import { openHomeScreen, openPopup } from "src/actions/navActions.js";

//Hooks
import useOpenPopup from "hooks/useOpenPopup.js";

//HelperFunctions
import getTheme from "theme/index.js";

function HomeScreen2(props) {
  let { colors, styles: defaultStyles, icons, fonts, images } = getTheme();

  let openPopup = useOpenPopup();

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: colors.mainTextColor}}>Home Screen 2</Text>
      <Button
        onPress={ () => { openPopup() } }
        title="Open Empty Popup"
        color="#F00"
        containerStyle={{
        }}
      />
    </SafeAreaView>
  );
}

export default connect((store) => {
  return {
  };
})(HomeScreen2);
