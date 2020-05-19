import { THEMES } from "./index.js";

const imagePathsDark = {
  mainLogo: require('../../../assets/Logo/cover-white.png'),
  welcomeBackground: require( "../../../assets/darkBGImage.jpg" ),
}

const imagePathsLight = {
  mainLogo: require( '../../../assets/Logo/cover-black.png' ),
  welcomeBackground: require( "../../../assets/lightBGImage.jpg" ),
}


export default function getImages( theme ){
  if ( theme == THEMES.DARK ){
    return imagePathsDark;
  } else if ( theme == THEMES.LIGHT ){
    return imagePathsLight;
  }
  return imagePathsDark;
}
  

