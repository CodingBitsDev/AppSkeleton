import React from 'react';
import {connect} from "react-redux"
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from "../screens/Auth/SignIn.js";
import SignUp from "../screens/Auth/SignUp.js";
import WelcomeScreen from "../screens/Auth/WelcomeScreen.js";

const Stack = createStackNavigator();
let MainStackNavigator = () => {
  return (
    <Stack.Navigator keyboardHandlingEnabled={false} >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp}/>
    </Stack.Navigator>
  )
}

export default connect((store) => {
  return {
  };
})(MainStackNavigator);

