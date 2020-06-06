import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Main from "src/Main.js";

//Auth
import WelcomeScreen from "src/screens/Auth/WelcomeScreen.js";
import SignIn from "src/screens/Auth/SignIn.js";
import SignUp from "src/screens/Auth/SignUp.js";

//Home
import HomeScreen from "src/screens/HomeScreen.js";
import HomeScreen2 from "src/screens/HomeScreen2.js";


import { createScreenStory } from "./utils/createStory.js";

storiesOf('App', module).add('Full', () => <Main />);

createScreenStory("Screens", "WelcomeScreen", WelcomeScreen)
createScreenStory("Screens", "SignIn", SignIn)
createScreenStory("Screens", "SignUp", SignUp)

createScreenStory("Screens", "HomeScreen", HomeScreen)
createScreenStory("Screens", "HomeScreen2", HomeScreen2)

