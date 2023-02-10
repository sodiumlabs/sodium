import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useLayoutEffect, useEffect } from "react";
import { Dimensions } from "react-native";

const dimensionAtom = atom([0, 0]);

export function useDimensionSize() {
  return useStore(dimensionAtom);
}

export function useListenerDimensionSize() {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
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
}