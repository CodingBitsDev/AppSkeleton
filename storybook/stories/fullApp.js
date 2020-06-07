import React from 'react';
import 'react-native';

import { storiesOf } from '@storybook/react-native';

import Main from "src/Main.js";

//Full App
storiesOf('App', module).add('Full', () => <Main />);

