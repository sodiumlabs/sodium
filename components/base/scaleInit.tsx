import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useEffect } from "react";


const ScaleAtom = atom<number>(1);
export const UseScale = () => {
  return useStore(ScaleAtom);
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

