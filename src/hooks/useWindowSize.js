import React, { useState, useEffect } from 'react';
import { Platform, Dimensions } from 'react-native';

export default function useWindowSize(friendID) {
  let [dimensions, setDimension] = useState( { width: Dimensions.get("window").width, height: Dimensions.get("window").height } );

  if (Platform.OS == "web"){
    useEffect ( () => {
        setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })
        window.addEventListener('resize', (data) => {setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })}); 
    }, [] )
  }
  else {
    let screenDimensions = Dimensions.get("screen") || {};
    useEffect ( () => {
      setDimension({width: screenDimensions.width, height: screenDimensions.height });
    }, [screenDimensions.width, screenDimensions.height] )
  }

  return dimensions;
}
