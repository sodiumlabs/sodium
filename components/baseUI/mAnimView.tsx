

import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, ViewProps } from 'react-native';

export default function MAnimView(props: ViewProps & { hideFinishCb?: () => void, visible: boolean }) {
  const [isAutoMeasure, setIsAutoMeasure] = useState(true);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const show = (viewHeight: number) => {
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: viewHeight,
      duration: 300,
      useNativeDriver: false
    }).start();
  }

  const onLayout = (event: LayoutChangeEvent) => {
    if (isAutoMeasure) {
      setIsAutoMeasure(false);
      const viewHeight = event.nativeEvent.layout.height;
      show(viewHeight);
    }
  }

  const hide = () => {
    Animated.timing(heightAnim, {
      easing: Easing.quad,
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      props.hideFinishCb && props.hideFinishCb();
    });
  }

  useEffect(() => {
    if (!props.visible) {
      hide();
    }
  }, [props.visible]);

  return (
    <Animated.View
      style={[styles.container, { width: '100%', overflow: 'hidden', height: isAutoMeasure ? 'auto' : heightAnim, opacity: isAutoMeasure ? 0 : 1 }]}
      onLayout={(event) => onLayout(event)}>
      {
        props.children
      }

    </Animated.View>

  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgba(200,200,200,1)',
  }
});