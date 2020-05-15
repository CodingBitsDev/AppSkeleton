import React, {useState, useEffect, useRef} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { withResizeDetector } from 'react-resize-detector';

//SafeArea
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from "./src/navigation/RootNavigator.js";

//Redux
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist'; 
import { PersistGate } from 'redux-persist/integration/react'
import persistStoreConfig from './src/configs/persistStoreConfig.js';
import store from "./src/configs/store.js";

//GlobalModal
import ReactResizeDetector from 'react-resize-detector';

//Fonts
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Inter-ExtraBold': require( "./assets/fonts/Inter-ExtraBold.ttf"),
    'Inter-Regular': require( "./assets/fonts/Inter-Regular.ttf"),
    'Inter-Black': require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require( "./assets/fonts/Inter-Light.ttf" ),
    "Inter-Medium": require( "./assets/fonts/Inter-Medium.ttf" ),
    "Inter-SemiBold": require( "./assets/fonts/Inter-SemiBold.ttf" ),
    "Inter-Thin": require( "./assets/fonts/Inter-Thin.ttf" ),
  });

  let [rerender, setRerender ] = useState( Math.random() )
  useEffect( () => {
    if ( Platform.OS == "web" ){
      window.addEventListener('resize', () => { }, true);
      setRerender( Math.random() );
    }
  } , [] )

  let [ rehydrated, setRehydrated ] = useState( false );
  const persistorRef = useRef();
  useEffect( () => {
    persistorRef.current = persistStore( store, null, () => {
      setRehydrated(true);
    });
  }, []);

  return fontsLoaded  ? (
    <ResizeComponent>
      <Provider store={store}>
        {persistorRef.current != null &&
            (<PersistGate persistor={ persistorRef.current }>
              <SafeAreaProvider>
                <RootNavigator />
              </SafeAreaProvider>
            </PersistGate>)
        } 
      </Provider>
    </ResizeComponent>
  ) : (<AppLoading />);
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
