export function makeStyle( style ) {
  let outStyle = {};
  if ( Array.isArray(style)){
    style.forEach( (element) => {
      outStyle = {...outStyle, ...(makeStyle(element))}
    }) 
  }else {
    outStyle = {...style };
  }
  return outStyle;
}

export function extractTextStyles( style ){
  let myStyle = makeStyle(style);
  let textStyleElements = [ "textShadowColor", "color", "fontSize", "fontStyle", "fontWeight", "lineHeight", "textAlign", "textDecorationLine", "fontFamily", "textShadowOffset", "textShadowRadius", "textAlignVertical", "letterSpacing", "textDecorationColor", "textDecorationStyle", "writingDirection", ];

  result = {}
  for (key in myStyle) {
    if (myStyle.hasOwnProperty(key) && textStyleElements.includes(myStyle[key])) {
      result[key] = myStyle[key];
    }
  }
  return result;
}
