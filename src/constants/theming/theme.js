import darkColors from "./colors/darkColors.js";
import lightColors from "./colors/lightColors.js";

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

  return { colors, styles };
}

function getColors( theme ){
  switch (theme) {
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
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
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
