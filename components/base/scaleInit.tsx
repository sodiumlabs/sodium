import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useEffect, useMemo } from "react";


const ScaleAtom = atom<number>(1);
export const UseScale = () => {
  return useStore(ScaleAtom);
}


export const UseCenterScale = () => {
  const scale = UseScale();
  const scaleStyle = useMemo(() => {
    return {
      transform: [
        { scale: scale }
      ]
    } as unknown;
  }, [scale]);
  return scaleStyle;
}

export const UseTopCenterScale = () => {
  const scale = UseScale();
  const scaleStyle = useMemo(() => {
    return {
      transform: [
        { translateY: `calc(50% * ${scale - 1})` },
        { scale: scale }
      ]
    } as unknown;
  }, [scale]);
  return scaleStyle;
}

export const UseTopRightScale = () => {
  const scale = UseScale();
  const scaleStyle = useMemo(() => {
    return {
      transform: [
        { translateX: `calc(-50% * ${scale - 1})` },
        { translateY: `calc(50% * ${scale - 1})` },
        { scale: scale }
      ]
    } as unknown;
  }, [scale]);
  return scaleStyle;
}

export const UseTopLeftScale = () => {
  const scale = UseScale();
  const scaleStyle = useMemo(() => {
    return {
      transform: [
        { translateX: `calc(50% * ${scale - 1})` },
        { translateY: `calc(50% * ${scale - 1})` },
        { scale: scale }
      ]
    } as unknown;
  }, [scale]);
  return scaleStyle;
}

const MaxWidth = 1700;
export default function ScaleInit() {

  const getAdapterScale = (): number => {
    let scale = 1;

    if (document.documentElement.clientWidth > MaxWidth) {
      scale = document.documentElement.clientWidth / MaxWidth;
    }
    return scale;
  }

  // 只调用一次 完成注册
  useEffect(() => {
    const handleSize = (innerHeight: number) => {
      let scale = getAdapterScale();
      ScaleAtom.set(scale);
      // console.log("document.documentElement.clientWidth" + scale)
      // ScaleAtom.set(1);
    }
    // 手动调用一次
    handleSize(window.innerHeight);

    const updateSize = (ev: Event): any => {
      const win = ev.currentTarget as Window;
      handleSize(win.innerHeight);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <></>
  )
}
