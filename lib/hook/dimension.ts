import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useLayoutEffect } from "react";
import { Dimensions } from "react-native";

const dimensionAtom = atom([0, 0]);

export function useDimensionSize() {
  return useStore(dimensionAtom);
}

export function useListenerDimensionSize() {
  // const [size, setSize] = React.useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      const width = Dimensions.get('window').width;
      const height = Dimensions.get('window').height;
      dimensionAtom.set([width, height]);
      // console.log("updateSize width:" + width + "  height:" + height);
    }
    updateSize();
    const subscription = Dimensions.addEventListener("change", updateSize);
    return () => subscription?.remove();
  }, []);
  // return size;
}