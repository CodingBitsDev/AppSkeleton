import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Main from "src/Main.js";
import WelcomeScreen from "src/screens/Auth/WelcomeScreen.js";

import { createStory } from "./utils/createStory.js";

storiesOf('App', module).add('General', () => <Main />);

createStory("Screens", "WelcomeScreen", WelcomeScreen)

