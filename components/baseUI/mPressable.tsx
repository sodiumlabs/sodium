import { useState } from 'react';
import { Pressable, PressableProps } from 'react-native';

export default function MPressable(props: PressableProps) {
  const { style, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [isPressIn, setIsPressIn] = useState(false);
  const pressStyle = {
    opacity: isPressIn ? 0.8 : 1
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
