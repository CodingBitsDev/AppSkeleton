import React, {useState} from "react";
import PropTypes from 'prop-types';
import {ActivityIndicator, Platform, Text, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight, View, } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import getTheme from "../constants/theming/theme.js";
import { getContrastColor } from "../helperFunctions/colorHelpers.js";
import { makeStyle } from "../helperFunctions/styleHelper.js";

function Button({ style, start, end, locations, ...props }){
  let { colors, styles } = getTheme();

  let extraStyles = {}
  let btnColor = colors.default;
  if (props.disabled){
    btnColor = colors.disabled;
  } else if (props.primary){
    btnColor = colors.primary;
  } else if (props.secondary){
    btnColor = colors.secondary;
  } else if (props.success){
    btnColor = colors.success;
  } else if (props.danger){
    btnColor = colors.danger;
  } else if (props.warning){
    btnColor = colors.warning;
  } else if (props.info){
    btnColor = colors.info;
  }
  btnColor = props.color || (style ? makeStyle(style).backgroundColor : null) || btnColor;

  let textColor = getContrastColor(btnColor);
  textColor = props.textColor || textColor;
   
  let btnStyle = {
    container: {
      height: 30,
      padding: 10,
      backgroundColor: props.transparent || props.outlined ? "transparent" : btnColor,
      alignItems: "center",
      justifyContent: "center",
      ...(props.outlined ? {...styles.border, borderColor: btnColor } : {} ),
      ...(props.rounded ? styles.roundConers.round : styles.roundConers.tiny),
      ...(props.noShadow ? {} : styles.shadow ),
      ...( makeStyle( props.containerStyle ) || {} ),
    },
    text: {
      color: props.transparent || props.outlined ? btnColor : textColor,
      fontSize: props.fontSize || 16,
      ...( makeStyle( props.textStyle ) || {} ),
    }
  };
  let gradientColors = props.transparent || props.outlined ? "transparent" : btnColor;
  gradientColors = props.colors || [gradientColors, gradientColors];
  return (
    <LinearGradient locations={locations} start={start} end={end} colors={gradientColors} style={btnStyle.container}>
    <Touchable {...props}>
      <React.Fragment>
        {props.iconLeft && props.iconLeft}
        <Text style={btnStyle.text}>{ props.title }</Text>
        {props.iconRight && props.iconRight}
      </React.Fragment>
    </Touchable>
    </LinearGradient>
  );
}

function Touchable(props){
  return ( Platform.OS === "ios" ? (
    <TouchableOpacity { ...props} />
  ) : (
    <TouchableOpacity {...props} />
  ));
}

Button.propTypes = {
  //ColorProps
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  warning: PropTypes.bool,
  info: PropTypes.bool, 
  //ShapeProps
  rounded: PropTypes.bool,
  outlined: PropTypes.bool,
  transparent: PropTypes.bool,
  //StyleProps
  fontSize: PropTypes.number,
  noShadow: PropTypes.bool,
  //ExtraStyles
  containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  iconLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  iconRight: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  colors: PropTypes.array,
  start: PropTypes.array,
  end: PropTypes.array,
  locations: PropTypes.array,
};

export default Button
