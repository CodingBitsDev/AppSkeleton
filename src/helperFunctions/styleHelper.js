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

  let result = {}
  let rest = {}
  for (key in myStyle) {
    if (myStyle.hasOwnProperty(key) && textStyleElements.includes(myStyle[key])) {
      result[key] = myStyle[key];
    }
    else {
      rest[key] = myStyle[key]
    }
  }
  return [ result, rest ];
}

export function extractPaddingStyles( style ){
  let myStyle = makeStyle(style);
  let textStyleElements = [ "padding", "paddingVertical", "paddingHorizontal", "paddingTop", "paddingBottom", "paddingRight", "paddingLeft", ];

  let result = {}
  let rest = {}
  for (key in myStyle) {
    if (myStyle.hasOwnProperty(key) && textStyleElements.includes(myStyle[key])) {
      result[key] = myStyle[key];
    }
    else {
      rest[key] = myStyle[key]
    }
  }
  return [ result, rest ];
}
