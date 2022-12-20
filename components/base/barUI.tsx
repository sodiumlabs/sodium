import { useAdapterWeb } from "../../lib/hook/adapter";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MVStack from "../baseUI/mVStack";
import Floater from "./floater";
import Footer from "./footer";
import Header from "./header";
import { useDimensionSize } from '../../lib/hook/dimension';
import { atom } from "nanostores";
import { useStore } from '@nanostores/react';
import { IBarParam } from "../../lib/define";

const barAtom = atom<IBarParam>({} as IBarParam);

export function updateBarParam(param: IBarParam) {
  barAtom.set({ ...param });
}


export function BarUI() {
  const barParam = useStore(barAtom);
  const isAdapterWeb = useAdapterWeb();
  const dimension = useDimensionSize();
  return (
    <MVStack stretchW style={{ position: 'absolute', zIndex: 1000, height: dimension[1] }} pointerEvents={'none'}>
      <MHStack stretchW stretchH style={{ position: 'relative' }} pointerEvents={'none'}>
        <MHStack stretchW pointerEvents={'none'}>
          {/* {hasNavigationBar && (!isAdapterWeb ? <Footer /> : <Header />)}
          <Floater /> */}
          {barParam.hasNavigationBar && (!isAdapterWeb ? <Footer /> : <Header />)}
          {barParam.hasFloatingBar && <Floater isNavigationBarBack={barParam.isNavigationBarBack} />}
        </MHStack>
      </MHStack>
    </MVStack>
  )
}