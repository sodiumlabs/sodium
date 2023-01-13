import { useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, ViewProps } from 'react-native';
import { globalStyle } from '../../lib/globalStyles';
import { AnimArrow } from '../baseUI/animArrow';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const BaseFoldFrame = (props: ViewProps & { defaultExpansion?: boolean, header: string }) => {
  const minHeight = 50;
  const { header } = props;
  const heightAnim = useRef(new Animated.Value(minHeight)).current;
  const [height, setHeight] = useState(-1);
  const [isFold, setIsFold] = useState(!props.defaultExpansion);

  const explance = (targetHeight: number, duration: number) => {
    if (targetHeight <= 0) {
      return;
    }
    setIsFold(false);
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: targetHeight,
      duration: duration,
      useNativeDriver: false
    }).start();
  }
  const fold = (targetHeight: number, duration: number) => {
    setIsFold(true)
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: targetHeight,
      duration: duration,
      useNativeDriver: false
    }).start();
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
    if (props.defaultExpansion || !isFold) {
      explance(event.nativeEvent.layout.height, 0);
    }
  }

  return (
    <Animated.View style={[styles.container, globalStyle.whiteBorderWidth, props.style, { height: heightAnim }]}>
      <MVStack stretchW onLayout={onLayout}>
        <Pressable onPress={onBtnClick} style={{ padding: 15 }}>
          <MHStack style={{ alignItems: 'center' }}>
            <MHStack style={{ flex: 1 }}>
              <MText style={{ fontWeight: '700' }}>{header}</MText>
            </MHStack>
            <AnimArrow isDown={!isFold} />
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
  container: {
    overflow: 'hidden',
    width: '100%',
  }
});