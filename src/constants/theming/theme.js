import darkColors from "./colors/darkColors.js";
import lightColors from "./colors/lightColors.js";

import { getIcons } from "./icons.js";
import { getFonts } from "./fonts.js";

export let THEMES = {
  DARK: "DARK",
  LIGHT: "LIGHT",
}

let theme = THEMES.DARK;

export function setTheme( color ){
  theme = color;
}

export default function getTheme(){
  let colors = getColors(theme);
  let styles = getStyle(colors);
  let icons = getIcons(colors)
  let fonts = getFonts()

  return { colors, styles, fonts, icons };
}

function getColors( themeName, fonts ){
  switch (themeName) {
    case THEMES.DARK:
      return darkColors;
    case THEMES.LIGHT:
      return lightColors;
    default:
      return darkColors;
  }
}

function getStyle(color){
  return {
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    border: {
      borderWidth: 1,
    },
    roundConers: {
      none: { borderRadius: 0, },
      tiny: { borderRadius: 2.5, },
      small: { borderRadius: 5, },
      medium: { borderRadius: 10, },
      large: { borderRadius: 15, },
      round: { borderRadius: 99, },
      
    },
  }
  
}
