import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { UseScale } from "../../components/base/scaleInit";
import { fixWidth } from "../define";
import { useDimensionSize } from "./dimension";

export function useAdapterWeb() {
  const dimension = useDimensionSize();
  return dimension[0] > fixWidth;
}

export function useAdapterScale() {
  const scale = UseScale();
  const [isInited, setIsInited] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateScale, setTranslateScale] = useState(1);
  const [originSize, setOriginSize] = useState(null);
  const handleLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    console.log("handleLayout width :", width, "height:  ", height);
    setOriginSize({ width, height });
  }, [scale]);

  const isFocus = useIsFocused();
  useEffect(() => {
    if (!isFocus) {
      setIsInited(false);
    }
  }, [isFocus]);

  useEffect(() => {
    if (!isFocus) return;
    if (!originSize) return;
    setTranslateScale(scale);
    setTranslateY((scale - 1) * originSize.height * 0.5);
    setTranslateX(-(scale - 1) * originSize.width * 0.5);
    // Give a little time to let the layout finish after the display. It's gonna be a twinkle and a twinkle
    const timeId = setTimeout(() => {
      setIsInited(true);
    }, 100);
    return () => {
      clearTimeout(timeId)
    };
  }, [scale, originSize, isFocus]);

  return {
    isInited,
    handleLayout,
    scaleStyleCenter: { transform: [{ translateY: translateY }, { scale: translateScale }] },
    scaleStyleRight: { transform: [{ translateY: translateY }, { translateX: translateX }, { scale: translateScale }] },
    scale: translateScale,
    originSize
  }
}