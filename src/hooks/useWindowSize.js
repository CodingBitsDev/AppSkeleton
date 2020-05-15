import React, { useState, useEffect } from 'react';
import { Platform, } from 'react-native';

export default function useWindowSize(friendID) {
  let [dimensions, setDimension] = useState( null );

  useEffect ( () => {
    if (Platform.OS == "web"){
      setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })
      window.addEventListener('resize', (data) => {setDimension({width:  document.body.clientWidth, height: document.body.clientHeight })}); 
    }
  }, [] )

  return dimensions;
}
