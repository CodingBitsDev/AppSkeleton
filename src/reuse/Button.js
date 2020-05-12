import React, {useState} from "react";
import PropTypes from 'prop-types';
import {ActivityIndicator, Platform, Text, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight, View, } from "react-native";

import getTheme from "../constants/theming/theme.js";
import { getContrastColor } from "../helperFunctions/colorHelpers.js";
import { makeStyle } from "../helperFunctions/styleHelper.js";

function Button(props){
  let { colors, styles } = getTheme();

  let {
    //ColorProps
    disabled, primary, secondary, success, danger, warning, info, 
    //ShapeProps
    rounded, outlined, transparent,
    //StyleProps
    fontSize,
    //ExtraStyles
    containerStyle, textStyle,
  } = props;

  let extraStyles = {}
  let btnColor = colors.default;
  if (disabled){
    btnColor = colors.disabled;
  } else if (primary){
    btnColor = colors.primary;
  } else if (secondary){
    btnColor = colors.secondary;
  } else if (success){
    btnColor = colors.success;
  } else if (danger){
    btnColor = colors.danger;
  } else if (warning){
    btnColor = colors.warning;
  } else if (info){
    btnColor = colors.info;
  }
  btnColor = props.color || btnColor;

  let textColor = getContrastColor(btnColor);
  textColor = props.textColor || textColor;
   
  let btnStyle = {
    container: {
      height: 30,
      padding: 10,
      backgroundColor: transparent || outlined ? "transparent" : btnColor,
      alignItems: "center",
      justifyContent: "center",
      ...(outlined ? {...styles.border, borderColor: btnColor } : {} ),
      ...(rounded ? styles.roundConers.round : styles.roundConers.tiny),
      ...styles.shadow,
      ...( makeStyle( containerStyle ) || {} ),
    },
    text: {
      color: transparent || outlined ? btnColor : textColor,
      fontSize: fontSize || 16,
      ...( makeStyle( textStyle ) || {} ),
    }
  };
  return (
    <Touchable style={btnStyle.container} {...props}>
      <React.Fragment>
        {props.iconLeft && props.iconLeft}
        <Text style={btnStyle.text}>{ props.title }</Text>
        {props.iconRight && props.iconRight}
      </React.Fragment>
    </Touchable>
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
  //ExtraStyles
  containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  iconLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  iconRight: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
};

export default Button
