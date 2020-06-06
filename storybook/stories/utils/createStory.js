import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';

import ScreenContainer from "./ScreenContainer.js";

import WelcomeScreen from "src/screens/Auth/WelcomeScreen.js";

export const createScreenStory = ( areaName, storyName, screen, initalStore, props ) => {
  let screenContainer = new ScreenContainer( {}, screen, props  )
  let Container = screenContainer.getContainer()
  
  storiesOf(areaName, module).add(storyName, () => <Container/>);
}



