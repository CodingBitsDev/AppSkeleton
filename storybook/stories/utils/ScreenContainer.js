import React, {useState, useEffect, useRef} from 'react';
import { Platform, StatusBar, View } from 'react-native';

//SafeArea
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Navigation
import RootNavigator from "src/navigation/RootNavigator.js";

//Redux
import { Provider } from 'react-redux';
import { persistStore  } from 'redux-persist'; 
import { PersistGate } from 'redux-persist/integration/react'

//GlobalModal
import ReactResizeDetector from 'react-resize-detector';

//Fonts
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

//setUpTheming
import  getTheme, { setTheme, THEMES,} from "theme/index.js";
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

const APEARANCE_TYPES =  {
  "light": THEMES.LIGHT,
  "dark": THEMES.DARK,
  "no-preference": THEMES.DARK,
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class ScreenContainer {
  constructor( store, ){
    this.store = store
  }

  getContainer(){
    return ( props ) => {
      const Stack = createStackNavigator();

      let [fontsLoaded] = useFonts({
        'Inter-ExtraBold': require( "assets/fonts/Inter-ExtraBold.ttf"),
        'Inter-Regular': require( "assets/fonts/Inter-Regular.ttf"),
        'Inter-Black': require("assets/fonts/Inter-Black.ttf"),
        "Inter-Bold": require("assets/fonts/Inter-Bold.ttf"),
        "Inter-ExtraLight": require("assets/fonts/Inter-ExtraLight.ttf"),
        "Inter-Light": require( "assets/fonts/Inter-Light.ttf" ),
        "Inter-Medium": require( "assets/fonts/Inter-Medium.ttf" ),
        "Inter-SemiBold": require( "assets/fonts/Inter-SemiBold.ttf" ),
        "Inter-Thin": require( "assets/fonts/Inter-Thin.ttf" ),
      });

      let colorScheme = useColorScheme()
      useEffect( () => {
        let currentTheme = Platform.OS !== "web" ? APEARANCE_TYPES[colorScheme] || THEMES.DARK : THEMES.DARK;
        setTheme( currentTheme, {
          standard: "Inter-Regular",
        });
      }, [ colorScheme ])

      let { colors, styles: defaultStyles, icons, fonts, images } = getTheme( );

      return (
        <AppearanceProvider>
          <ResizeComponent>
            <StatusBar translucent backgroundColor={colors.backgroundColor} barStyle={"light-contents"}/>
            <Provider store={this.store}>
              <SafeAreaProvider>
                { props.children }
                {/*
                  <NavigationContainer>
                    <Stack.Navigator headerMode="none" screenOptions={{ headerShown: false }} >
                      <Stack.Screen key="StoryBookScreen" name="StoryBookScreen">
                      </Stack.Screen>
                    </Stack.Navigator>
                  </NavigationContainer>
                  */}
              </SafeAreaProvider>
            </Provider>
          </ResizeComponent>
        </AppearanceProvider>
      );
    }
  }
}

function ResizeComponent({ children }){
  if (Platform.OS == "web"){
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {children}
      </ReactResizeDetector>
    )
  }
  return children;
}
