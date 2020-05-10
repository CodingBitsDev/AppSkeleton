import React, { useEffect, useRef } from 'react';
import {connect} from "react-redux"
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Popup from "../navigation/Popup.js";

import HomeScreen from "../screens/HomeScreen.js";
import HomeScreen2 from "../screens/HomeScreen2.js";

import { setNavState } from "../actions/navActions.js";

const RootStack = createStackNavigator();
let navRef;

const Stack = createStackNavigator();
let MainNav = () => {
  return (
    <View style={[{flex: 1}]}>
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
    </View>
  )
}

function StackNavigator(props) {
  navRef = useRef();

  useEffect ( () => {
    if (navRef.current){
      props.dispatch(setNavState(navRef.current.getRootState()));
    }
  }, []);

  let navActionRef = useRef(null);
  
  return (
    <NavigationContainer
      ref={ navRef }
      onStateChange={(state) => { onNavStateChange(state, props) }}
    >
      <RootStack.Navigator  mode="modal" headerMode="none" screenOptions={{ animationEnabled: false }} >
        <RootStack.Screen name="Root" component={MainNav}/>
        <RootStack.Screen 
          name="Popup"
          component={ Popup }
          options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: 'rgba(52, 52, 52, 0.01)' },
            cardOverlayEnabled: true,
            opacity: 1,
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.2],
                    extrapolate: 'clamp',
                  }),
                },
              };
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  ) 
}

function onNavStateChange( state, props ){
  let currentScreen = getActiveRouteName( state )
  props.dispatch(setNavState( state ))
}

function getActiveRouteName( state ){
  let route = state.routes[state.index];
  if (route.state){
    return getActiveRouteName(route.state)
  }
  return route.name;
}



export default connect((store) => {
  return {
    currentNavAction: store.navReducer.currentNavAction,
  };
})(StackNavigator);
