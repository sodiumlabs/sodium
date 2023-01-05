import { useRef, useEffect } from 'react';
import { Animated, Easing } from "react-native"
import { IconArrow } from "../../lib/imageDefine"
import MImage from "./mImage"


export const AnimArrow = (props: { isDown: boolean }) => {
  const { isDown } = props;
  const heightAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: isDown ? 0 : 90,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [isDown])

  let interpolatedAnimation = heightAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });
  return (
    <Animated.View style={{ transform: [{ rotate: interpolatedAnimation }] }}>
      <MImage w={8} h={8} source={IconArrow} />
    </Animated.View>
  )
}