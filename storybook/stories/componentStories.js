import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

//Components
import Button from "src/reuse/Button.js";

//Decorators
const Center = ({children}) => { return (<View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>{children}</View>) }

//Start
storiesOf('Button', module).add('Button', () => <Center><Button style={{ width: 100 }} title="Test"/></Center>);

