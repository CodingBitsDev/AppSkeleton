import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

export default function App() {
  let [ rehydrated, setRehydrated ] = useState( false );
  const persistorRef = useRef();
  useEffect( () => {
    persistorRef.current = persistStore( store, null, () => {
      setRehydrated(true);
    });
  }, []);

  return (
    <Provider store={store}>
      {persistorRef.current != null &&
          (<PersistGate persistor={ persistorRef.current }>
            <SafeAreaProvider>
              <RootNavigator />
            </SafeAreaProvider>
          </PersistGate>)
      } 
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
