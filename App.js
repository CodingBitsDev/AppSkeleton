import React from 'react';

//Storybook
import StorybookUI from "./storybook/index.js";
import Main from "src/Main.js";

export default function App() {
  //Remove this line if you want to remove storybook in your published apps
  return <StorybookUI />

  return __DEV__ ? <StorybookUI /> : <Main />
}
