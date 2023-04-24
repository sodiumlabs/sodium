import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mapRange } from '../../lib/common/common';
import { designWidth, fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import { useDimensionSize } from '../../lib/hook/dimension';
import MHStack from '../baseUI/mHStack';
import FloaterDrawer from './floaterDrawer';



export default function Floater(props: ViewProps & { hasNavigationBarBack?: boolean }) {
  const { style, hasNavigationBarBack, ...rest } = props;
  const insets = useSafeAreaInsets();
  const dimensionsize = useDimensionSize();
  const [webAdapterWidth, setWebAdapterWidth] = useState(200);
  const isAdapterWeb = useAdapterWeb();

  useEffect(() => {
    if (isAdapterWeb) {
      const offsetWidth = Math.max(Math.min(dimensionsize[0] - fixWidth, designWidth - fixWidth), 0);
      const width = mapRange(offsetWidth, 0, 560, 200, 420);
      setWebAdapterWidth(width);
    }
  }, [isAdapterWeb, dimensionsize[0]])

  const adapterStyle = {
    width: isAdapterWeb ? webAdapterWidth : '100%',
    position: isAdapterWeb ? 'absolute' : 'relative',
    right: 0
  }

  return (
    // { top: insets.top }
    <MHStack stretchW style={[styles.container, { top: insets.top }]} pointerEvents={'box-none'} {...rest}>
      {/* <BlurView intensity={100} style={{ 'width': '100%', borderRadius: 15 }}> */}
      <MHStack stretchH stretchW >
        <MHStack style={[adapterStyle as unknown]}>
          <FloaterDrawer hasNavigationBarBack={props.hasNavigationBarBack} />
        </MHStack>
      </MHStack>
      {/* </BlurView> */}
    </MHStack>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 15,
    paddingRight: 12,
    paddingTop: 33,
    paddingBottom: 15,
  }
});