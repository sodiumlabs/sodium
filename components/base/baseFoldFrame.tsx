import { useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, ViewProps } from 'react-native';
import { globalStyle } from '../../lib/globalStyles';
import { AnimArrow } from '../baseUI/animArrow';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const BaseFoldFrame = (props: ViewProps & { defaultExpansion?: boolean, header: string, maxHeight?: number }) => {
  const minHeight = 50;
  const { header, maxHeight = 600 } = props;
  const heightAnim = useRef(new Animated.Value(minHeight)).current;
  const [contentLayoutHeight, setContentLayoutHeight] = useState(-1);
  const [isContentLayoutInit, setIsContentLayoutInit] = useState(false);

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
      explance(contentLayoutHeight, 300);
    } else {
      fold(minHeight, 300);
    }
  }
  const onLayout = (event: LayoutChangeEvent) => {
    // On the mobile side, the size of the child View will be calculated several times when an Animated.view is added externally and the Height is set to 'auto', and each time the size is not the real size.Therefore, the Height is set to auto and the true height is obtained from onLayout.Then, the onLayout caused by Animated.view is ignored.
    if (!isContentLayoutInit) {
      setContentLayoutHeight(event.nativeEvent.layout.height);
      setIsContentLayoutInit(true);
      if (props.defaultExpansion || !isFold) {
        explance(event.nativeEvent.layout.height, 0);
      }
    }
  }


  return (
    <Animated.View style={[styles.container, globalStyle.whiteBorderWidth, props.style, { height: isContentLayoutInit ? heightAnim : 'auto' }]}>
      <MVStack stretchW onLayout={onLayout} >
        <Pressable onPress={onBtnClick} style={{ padding: 15, height: minHeight }}>
          <MHStack style={{ alignItems: 'center' }}>
            <MHStack style={{ flex: 1 }}>
              <MText style={{ fontWeight: '700' }}>{header}</MText>
            </MHStack>
            <AnimArrow isDown={!isFold} />
          </MHStack>
        </Pressable>

        <ScrollView style={{ width: '100%', maxHeight: maxHeight }}>
          <MVStack style={{ padding: 15 }}>
            {props.children}
          </MVStack>
        </ScrollView>
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