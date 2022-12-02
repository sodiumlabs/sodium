import { ReactNode, useRef, useState } from 'react';
import { Animated, Image, Easing, ViewProps, Pressable, LayoutChangeEvent } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const BaseFoldFrame = (props: ViewProps & { header: ReactNode }) => {
  const minHeight = 50;
  const { header } = props;
  const heightAnim = useRef(new Animated.Value(minHeight)).current;
  const [height, setHeight] = useState(-1);
  const [isFold, setIsFold] = useState(true);

  const explance = () => {
    if (height <= 0) {
      return;
    }
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: height,
      duration: 300,
      useNativeDriver: false
    }).start(() => setIsFold(false));
  }
  const fold = () => {
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: minHeight,
      duration: 300,
      useNativeDriver: false
    }).start(() => setIsFold(true));
  }

  const onBtnClick = () => {
    if (isFold) {
      explance();
    } else {
      fold();
    }
  }


  const onLayout = (event: LayoutChangeEvent) => {
    // if (isAutoMeasure) {
    //   setIsAutoMeasure(false);
    //   const viewHeight = event.nativeEvent.layout.height;
    //   show(viewHeight);
    // }
    // console.log(event.nativeEvent.layout.height);
    setHeight(event.nativeEvent.layout.height);
  }

  return (
    <Animated.View style={{ borderRadius: 15, backgroundColor: '#aaa', padding: 15, overflow: 'hidden', height: heightAnim }}>
      <MVStack stretchW onLayout={onLayout}>
        <MHStack style={{ flex: 1, height: minHeight, alignItems: 'center' }}>
          <MHStack style={{ flex: 1 }}>
            {header}
          </MHStack>
          <Pressable onPress={onBtnClick}>
            <Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />
          </Pressable>
        </MHStack>

        {props.children}
      </MVStack>
    </Animated.View>
  );
};
