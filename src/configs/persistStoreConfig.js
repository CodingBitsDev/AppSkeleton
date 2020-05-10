import { AsyncStorage } from 'react-native';

const PERSIST_STORE_CONFIG = {
  transforms: [],
  storage: AsyncStorage,
  debounce: 33,
  //TODO Change the store name
  key: 'AppSkeletonStore',
  // whitelist: [''],
  blacklist: [/*'navReducer','nav', 'viewReducer'*/],
}

export default PERSIST_STORE_CONFIG;
