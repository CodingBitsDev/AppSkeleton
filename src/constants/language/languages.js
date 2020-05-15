import * as Localization from 'expo-localization';

import I18n from 'i18n-js';
import en from './languages/en.js';

I18n.fallbacks = true; 
I18n.missingBehaviour = 'guess'; // It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.defaultLocale = 'en'; // If the current locale in device is not set
//I18n.locale = 'en'; // If we do not want the framework to use the phone's locale by default

I18n.translations = {
  en,
};

export const setLocale = (locale) => {
  I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale; // It will be used to define intial language state in reducer.

export default I18n.translate.bind(I18n);

