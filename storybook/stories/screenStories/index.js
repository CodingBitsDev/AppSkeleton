import React from 'react';
import 'react-native';

import { storiesOf } from '@storybook/react-native';
import { createScreenStory } from "../utils/createStory.js";

//Screens
//Auth
import WelcomeScreen from "src/screens/Auth/WelcomeScreen.js";
import SignIn from "src/screens/Auth/SignIn.js";
import SignUp from "src/screens/Auth/SignUp.js";

//Home
import HomeScreen from "src/screens/HomeScreen.js";
import HomeScreen2 from "src/screens/HomeScreen2.js";

//Creation of stories
createScreenStory("Screens", "WelcomeScreen", WelcomeScreen);
createScreenStory("Screens", "SignIn", SignIn)
createScreenStory("Screens", "SignUp", SignUp)

createScreenStory("Screens", "HomeScreen", HomeScreen )
createScreenStory("Screens", "HomeScreen2", HomeScreen2)

