
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mapRange } from '../../lib/common/common';
import { designWidth, fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import { useDimensionSize } from '../../lib/hook/dimension';
import MHStack from '../baseUI/mHStack';
import HeaderExpansion from './headerExpansion';



export default function Floater(props: { isNavigationBarBack?: boolean }) {
  const insets = useSafeAreaInsets();
  const dimensionsize = useDimensionSize();
  const [webAdapterWidth, setWebAdapterWidth] = useState(200);
  const isAdapterWeb = useAdapterWeb();
  // debugger

  // useFocusEffect(
  //   useCallback(() => {
  //     // Do something when the screen is focused
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       setIsFold(true);
  //     };
  //   }, [])
  // );

  useEffect(() => {
    if (isAdapterWeb) {
      const offsetWidth = Math.max(Math.min(dimensionsize[0] - fixWidth, designWidth - fixWidth), 0);
      // 0   ~ 560
      // 200 ~ 420
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
    <MHStack stretchW style={[styles.container, { top: insets.top }]}>
      <BlurView style={{ 'width': '100%' }}>
        <MHStack stretchH stretchW >
          <MHStack style={[adapterStyle as unknown]}>
            {
              <HeaderExpansion isBack={props.isNavigationBarBack} />
            }
          </MHStack>

        </MHStack>
      </BlurView>
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