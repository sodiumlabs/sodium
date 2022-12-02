import React, { useLayoutEffect } from "react";
import { Dimensions } from "react-native";

export function useDimensionSize() {
  const [size, setSize] = React.useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([Dimensions.get('window').width, Dimensions.get('window').height])
    }
    updateSize();
    const subscription = Dimensions.addEventListener("change", updateSize);
    return () => subscription?.remove();
  }, []);
  return size;
}