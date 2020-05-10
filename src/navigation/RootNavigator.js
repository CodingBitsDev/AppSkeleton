//React Specific
import React, { useEffect, useRef } from 'react';
import {connect} from "react-redux"

//NavSpecific
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Components
import PopupRoot from "../screens/Popups/PopupRoot.js";
import Loading from "../screens/Loading.js";
import MainStackNavigator from "./MainStackNavigator.js";
import AuthStackNavigator from "./AuthStackNavigator.js";

//Actions
import { setNavState } from "../actions/navActions.js";
import { setNotSignedIn } from "../actions/authActions.js";

const RootStack = createStackNavigator();

function RootNavigator( {user, checkingLogin, ...props} ) {
  //navRef
  navRef = useRef();

  //Set the inital navState
  useEffect ( () => {
    if (navRef.current){
      props.dispatch(setNavState(navRef.current.getRootState()));
    }
  }, []);

  //Mock LoginCheckTime
  useEffect( () => {
    setTimeout( () => {
      props.dispatch(setNotSignedIn());
    }, 500 );

  })

  return (
    <NavigationContainer
      ref={ navRef }
      onStateChange={(state) => { onNavStateChange(state, props) }}
    >
      <RootStack.Navigator  mode="modal" headerMode="none" screenOptions={{ animationEnabled: false }} >
        { checkingLogin? ( 
          <RootStack.Screen name="Loading" component={Loading}/>
        ) : user ? (
          <RootStack.Screen name="Main" component={MainStackNavigator}/>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator}/>
        )

        }
        <RootStack.Screen 
          name="Popup"
          component={ PopupRoot }
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
    user: store.authReducer.user,
    checkingLogin: store.authReducer.checkingLogin,
    currentNavAction: store.navReducer.currentNavAction,
  };
})(RootNavigator);
