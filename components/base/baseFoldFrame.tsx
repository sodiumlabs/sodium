import { ReactNode, useRef, useState, useEffect } from 'react';
import { Animated, Easing, Image, LayoutChangeEvent, Pressable, StyleSheet, ViewProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';

export const BaseFoldFrame = (props: ViewProps & { defaultExpansion?: boolean, header: ReactNode }) => {
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
      <MVStack stretchW onLayout={onLayout}>
        <Pressable onPress={onBtnClick} style={{ padding: 15 }}>
          <MHStack style={{ alignItems: 'center' }}>
            <MHStack style={{ flex: 1 }}>
              {header}
            </MHStack>
            <Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />
          </MHStack>
        </Pressable>

        <MVStack style={{ padding: 15 }}>
          {props.children}
        </MVStack>
      </MVStack>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: { borderRadius: 15, backgroundColor: '#aaa', overflow: 'hidden', width: '100%' }
});