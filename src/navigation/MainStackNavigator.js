import React from 'react';
import {connect} from "react-redux"
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen.js";
import HomeScreen2 from "../screens/HomeScreen2.js";

import getTheme from "theme/index.js";

const Stack = createStackNavigator();

let { colors, styles: defaultStyles, icons, fonts, images } = getTheme();

let MainStackNavigator = () => {
  return (
    <Stack.Navigator 
      keyboardHandlingEnabled={false}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        }
      }}
    >
      <Stack.Screen 
        name="HomeScreen"
        key="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'My home',
        }}
      />
      <Stack.Screen name="HomeScreen2" component={HomeScreen2}/>
    </Stack.Navigator>
  )
}

export default connect((store) => {
  return {
  };
})(MainStackNavigator);
