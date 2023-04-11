import { useStore } from '@nanostores/react';
import { atom } from "nanostores";
import { IBarParam } from "../../lib/define";
import { useAdapterWeb } from "../../lib/hook/adapter";
import MHStack from "../baseUI/mHStack";
import MVStack from "../baseUI/mVStack";
import Floater from "./floater";
import Footer from "./footer";
import Header from "./header";

const barAtom = atom<IBarParam>({} as IBarParam);

export function updateBarParam(param: IBarParam) {
  barAtom.set({ ...param });
}

export function BarUI() {
  const barParam = useStore(barAtom);
  const isAdapterWeb = useAdapterWeb();
  // const adapterStyle = Platform.OS == "web" ? { cursor: "auto" } as unknown : {};

  return (
    <MVStack stretchW style={{ position: 'absolute', zIndex: 1000, height: '100%' }} pointerEvents={'box-none'} >
      <MHStack stretchW stretchH style={{ position: 'relative' }} pointerEvents={'box-none'}>
        <MHStack stretchW pointerEvents={'box-none'} style={{ zIndex: 0 }} >
          {barParam.hasNavigationBar && (!isAdapterWeb ? <Footer style={{ zIndex: 1 }} /> : <Header style={{ zIndex: 1 }} />)}
          {barParam.hasFloatingBar && <Floater hasNavigationBarBack={barParam.hasNavigationBarBack} />}
        </MHStack>
      </MHStack>
    </MVStack>
  )
}