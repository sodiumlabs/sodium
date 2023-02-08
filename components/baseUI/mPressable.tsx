import { useState } from 'react';
import { Pressable, PressableProps } from 'react-native';

export default function MPressable(props: PressableProps & { scale?: number }) {
  const { scale = 1.05, style, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [isPressIn, setIsPressIn] = useState(false);
  const pressStyle = {
    transform: [{ scale: isPressIn ? scale : 1 }]
    // opacity: isPressIn ? 0.5 : 1
  }

  let newStyle = [];
  if (Array.isArray(style)) {
    newStyle = [...style, pressStyle];
  } else {
    newStyle = [style, pressStyle];
  }
  return (
    <Pressable
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      onPressIn={() => setIsPressIn(true)}
      onPressOut={() => setIsPressIn(false)}
      style={newStyle}

      {...reset}
    >
      {props.children}
    </Pressable>
  )
}
