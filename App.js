import React from 'react';

//Storybook
import StorybookUI from "./storybook/index.js";
import Main from "src/Main.js";

export default function App() {
  return __DEV__ ? <StorybookUI /> : <Main />
}
