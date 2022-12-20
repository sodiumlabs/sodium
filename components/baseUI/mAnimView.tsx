


// export default function MAnimView(props: ViewProps & { hideFinishCb?: () => void, isExpan: boolean }) {
import { ReactNode, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, ViewProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MVStack from '../baseUI/mVStack';

export default function MAnimView(props: ViewProps & { hideFinishCb?: () => void, defaultExpansion?: boolean, header: ReactNode }) {
  const minHeight = 50;
  const { header } = props;
  const heightAnim = useRef(new Animated.Value(minHeight)).current;
  const [height, setHeight] = useState(-1);
  const [isFold, setIsFold] = useState(!props.defaultExpansion);

  const explance = (targetHeight: number, duration: number) => {
    if (targetHeight <= 0) {
      return;
    }
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: targetHeight,
      duration: duration,
      useNativeDriver: false
    }).start(() => setIsFold(false));
  }
  const fold = (targetHeight: number, duration: number) => {
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: targetHeight,
      duration: duration,
      useNativeDriver: false
    }).start(() => setIsFold(true));
  }

  const onBtnClick = () => {
    if (isFold) {
      explance(height, 300);
    } else {
      fold(minHeight, 300);
    }
  }

  const onLayout = (event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
    if (props.defaultExpansion) {
      explance(event.nativeEvent.layout.height, 0);
    }
  }

  return (
    <Animated.View style={[styles.container, props.style, { height: heightAnim }]}>
      <MVStack stretchW onLayout={onLayout} pointerEvents='auto' >
        <Pressable onPress={onBtnClick} style={{ height: 50 }}>
          <MHStack stretchH stretchW style={{ alignItems: 'center' }}>
            <MHStack style={{ flex: 1 }}>
              {header}
            </MHStack>
          </MHStack>
        </Pressable>

        <MVStack style={{ padding: 15 }} >
          {props.children}
        </MVStack>
      </MVStack>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: '#aaa',
    overflow: 'hidden',
    width: '100%'
  }
});


