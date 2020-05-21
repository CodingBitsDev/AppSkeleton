// @flow
import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Dimensions, ActivityIndicator, Platform, Text, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight, View, } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import getTheme from "theme/index.js";
import { getContrastColor } from "../helperFunctions/colorHelpers.js";
import { makeStyle, extractPaddingStyles } from "../helperFunctions/styleHelper.js";

function Button({ style, start, end, locations, ...props }){
  let [contentSize, setContentSize] = useState(null);
  let [containerSize, setContainerSize] = useState(null);
  let [hover, setHover] = useState(false);

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
  btnColor = props.disabled ? props.disabledColor || colors.disabled : btnColor;

  let textColor = getContrastColor(btnColor);
  textColor = props.textColor || textColor;
   
  let [ paddingStyle, containerStyle ] = extractPaddingStyles(props.containerStyle);
  let textStyle = makeStyle(props.textStyle);

  let maxScaleIncrease = 5;
  let scaleX = containerSize && containerSize.height > maxScaleIncrease * 2 ? 1 + maxScaleIncrease/containerSize.height : 1.1;
  let scaleY = containerSize && containerSize.width > maxScaleIncrease * 2 ? 1 + maxScaleIncrease/containerSize.width : 1.1;
  let scale = Math.min( scaleX, scaleY );
  let btnStyle = {
    container: {
      minHeight: 30,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      ...(props.outlined && !props.transparent ? {...styles.border, borderColor: btnColor } : {} ),
      ...(props.full ? styles.roundConers.none : props.rounded ? styles.roundConers.round : styles.roundConers.tiny),
      ...(props.full ? { borderRightWidth: 0, borderLeftWidth:0, width: "100%"} : {} ),
      ...(props.block ? { width: "95%",} : {} ),
      ...(props.noShadow || props.transparent || props.outlined ? {} : styles.shadow ),
      ...( containerStyle || {} ),
      ...(hover & !props.noHover && !props.disabled ? { transform: [ { scaleX: scale }, { scaleY: scale } ] } : {}),
    },
    text: {
      color: props.transparent || props.outlined ? btnColor : textColor,
      fontSize: props.fontSize || 16,
      ...( textStyle || {} ),
    },
    contentStyle:{
      padding: props.transparent ? 0 : 10,
      alignSelf: "stretch",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center" 
    },
  };

  let gradientColors = props.disabled ? ( props.disabledColors || [btnColor, btnColor] ) : ( props.colors || [btnColor, btnColor] );
  gradientColors = props.transparent || props.outlined ? [ "transparent", "transparent" ] : gradientColors;

  return (
      <Touchable
        onLayout={ event => { setContainerSize({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height}) }}
        style={btnStyle.container} {...props}>
        <LinearGradient 
          onMouseEnter={() => setHover( true )}
          onMouseLeave={() => setHover( false )}
          locations={locations}
          start={start}
          end={end}
          colors={gradientColors}
          style={[ btnStyle.contentStyle ,paddingStyle]}
          onLayout={ event => { setContentSize({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height}) }}
        >
        <React.Fragment>
          {props.iconLeft && props.iconLeft}
          <Text style={btnStyle.text}>{ props.title }</Text>
          {props.iconRight && props.iconRight}
        </React.Fragment>
        </LinearGradient>
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

function removeUndefinedFromObject({...obj}){
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
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
  color: PropTypes.string,
  disabledColor: PropTypes.string,
  textColor: PropTypes.string,
  //ShapeProps
  full: PropTypes.bool,
  block: PropTypes.bool,
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
  disabledColors: PropTypes.array,
  start: PropTypes.array,
  end: PropTypes.array,
  locations: PropTypes.array,
  //Interaction Props
  noHover: PropTypes.bool,
  //StandardProps
  style: PropTypes.object,
  //DataProps
  title: PropTypes.title,
};

export default Button
