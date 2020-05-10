//React Specific
import React, { useEffect, useRef } from 'react';
import {connect} from "react-redux"

//NavSpecific
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import Popup from "../navigation/Popup.js";
import StackNavigator from "./StackNavigator.js";

//Actions
import { setNavState } from "../actions/navActions.js";

const RootStack = createStackNavigator();

function RootNavigator(props) {
  //navRef
  navRef = useRef();

  //Set the inital navState
  useEffect ( () => {
    if (navRef.current){
      props.dispatch(setNavState(navRef.current.getRootState()));
    }
  }, []);

  return (
    <NavigationContainer
      ref={ navRef }
      onStateChange={(state) => { onNavStateChange(state, props) }}
    >
      <RootStack.Navigator  mode="modal" headerMode="none" screenOptions={{ animationEnabled: false }} >
        <RootStack.Screen name="Root" component={StackNavigator}/>
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

//Inform the Reducers about a navStateChange
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
})(RootNavigator);
