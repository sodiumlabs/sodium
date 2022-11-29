import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export default function MText(props: { children?: React.ReactNode, style?: StyleProp<TextStyle> }) {
  return (
    <Text style={props.style} numberOfLines={1} ellipsizeMode={'tail'}> {props.children} </Text>
  )
}
