import React from 'react';
import {connect} from "react-redux"
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen.js";
import HomeScreen2 from "../screens/HomeScreen2.js";

const Stack = createStackNavigator();
let MainStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="HomeScreen"
        key="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'My home',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
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
