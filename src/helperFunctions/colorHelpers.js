import colorString from "color-string";
import Color from "color";

//Gets Either Black or white depending on what has highter contrast
export function getContrastColor( string ){
  let rgbColor = colorString.get.rgb(string)
  let color = Color(rgbColor);
  return color.isLight() ? "#000000" : "#FFFFFF";
}
