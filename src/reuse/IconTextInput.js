import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {ActivityIndicator, Platform, TextInput, View, Dimensions, } from "react-native";

import getTheme from "../constants/theming/theme.js";
import { getContrastColor } from "../helperFunctions/colorHelpers.js";
import { extractTextStyles, makeStyle } from "../helperFunctions/styleHelper.js";

function IconTextInput({ style, ...props }) {
  let [ iconSize, setIconSize ] = useState( null );
  let [ textInputStyle, setTextInputStyle ] = useState(extractTextStyles(style)[0])
  
  let {width, height} = Dimensions.get("window");

  let { colors, styles: defaultStyles, icons, fonts } = getTheme();

  useEffect( () => {
    setTextInputStyle(extractTextStyles(style)[0]);
  }, [style] );

  let styles = {
    container: {
      flex: 0,
      flexDirection: "row",
      minWidth: 150,
      minHeight: 50,
      padding: 3,
      borderBottomWidth: 1,
      borderColor: "grey",
      overflow: "hidden",
      ...defaultStyles.roundConers.tiny,
      ...makeStyle(style),
    },
    iconContainer: {
      marginHorizontal: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      flexGrow: 1,
      maxWidth: width - ( iconSize ? iconSize.width : 0 ),
      ...textInputStyle,
    },
  }

  return (
    <View style={[styles.container, ]} { ...props } >
      <View
        style={styles.iconContainer}
        onLayout={ event => { setIconSize({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height}) }}
      >
        {props.icon}
      </View>
      <TextInput style={ styles.textStyle } {...props} />
    </View>
  )
}

export default IconTextInput;
