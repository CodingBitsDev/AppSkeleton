//React Specific
import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import {connect} from "react-redux"
import PropTypes from 'prop-types';

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
import { checkSignIn } from "../actions/authActions.js";

const Stack = createStackNavigator();

function RootNavigator( {user, checkingLogin, ...props} ) {
  //navRef
  let navRef = useRef();
  let initalStateDispatched = useRef(false);

  //Set the inital navState
  useEffect ( () => {
    if (!initalStateDispatched.current && navRef.current){
      props.dispatch(setNavState(navRef.current.getRootState()));
    }
  });

  //Mock LoginCheckTime
  useEffect( () => {
    setTimeout( () => {
      props.dispatch(checkSignIn());
    }, 1 );
  }, [])

  //Linking
  const linking = {
    prefixes: Platform.OS == "web" ? [window.location.host, 'app-skeleton://'] : ['app-skeleton://'] ,
    config: {
      popup: "/home/popup",
      Auth: {
        screens: {
          path: "",
          WelcomeScreen: "welcome",
          SignIn: "sign-in",
          SignUp: "register",
        }
      },
      Main: {
        screens: {
          path: "",
          HomeScreen: "home",
          HomeScreen2: "home2",
        }
      }
    },
  };

  //This cannot be a screen because it is always checked and would by that destroy the linking
  if ( checkingLogin ){
    return (<Loading />);
  }

  return (
    <NavigationContainer
      ref={ navRef }
      onStateChange={(state) => { onNavStateChange(state, props) }}
      {...( Platform.OS == "web" ? {linking:linking} : {} ) }
    >
      <Stack.Navigator  keyboardHandlingEnabled={false} mode="modal" headerMode="none" screenOptions={{ animationEnabled: false }} >
        { user || props.processedWithoutAccount ? (
          <Stack.Screen name="Main" component={MainStackNavigator}/>
        ) : (
          <Stack.Screen name="Auth" component={AuthStackNavigator}/>
        )}
        <Stack.Screen 
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
      </Stack.Navigator>
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


RootNavigator.propTypes = {
  processedWithoutAccount: PropTypes.bool,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  checkingLogin: PropTypes.bool,
}

export default connect((store) => {
  return {
    user: store.authReducer.user,
    checkingLogin: store.authReducer.checkingLogin,
    processedWithoutAccount: store.authReducer.processedWithoutAccount,
    currentNavAction: store.navReducer.currentNavAction,
  };
})(RootNavigator);
