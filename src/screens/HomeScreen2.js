import * as React from 'react';
import { connect } from "react-redux"; 

import { View, Text, Button  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { openHomeScreen, openPopup } from "../actions/navActions.js";

//Hooks
import useOpenPopup from "hooks/useOpenPopup.js";

function HomeScreen2(props) {
  let openPopup = useOpenPopup();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen 2</Text>
      <Button
        onPress={ () => { openPopup() } }
        title="Open Empty Popup"
        color="#F00"
      />
    </SafeAreaView>
  );
}

export default connect((store) => {
  return {
  };
})(HomeScreen2);
