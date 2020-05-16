import darkColors from "./colors/darkColors.js";
import lightColors from "./colors/lightColors.js";

import { getIcons } from "./icons.js";
import { getFonts } from "./fonts.js";
import { getStyles } from "./styles.js";

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
  let styles = getStyles(colors);
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
