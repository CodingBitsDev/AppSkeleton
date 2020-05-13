import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {ActivityIndicator, Platform, TextInput, View, } from "react-native";

import getTheme from "../constants/theming/theme.js";
import { getContrastColor } from "../helperFunctions/colorHelpers.js";
import { extractTextStyles, makeStyle } from "../helperFunctions/styleHelper.js";

function IconTextInput({ style, ...props }) {
  let [ textInputStyle, setTextInputStyle ] = useState(extractTextStyles(style)[0])
  useEffect( () => {
    setTextInputStyle(extractTextStyles(style)[0]);
  }, [style] );
  return (
    <View style={[{flexDirection: "row", minWidth: 50, borderBottomWidth: 1}, style ]} { ...props } >
      {props.icon}
      <TextInput style={textInputStyle} {...props} />
    </View>
  )
}

export default IconTextInput;
