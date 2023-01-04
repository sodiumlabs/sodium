



import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TranslateYTransform } from 'react-native';
import MHStack from './mHStack';
import MImage from './mImage';

export default function MInput(props: TextInputProps) {
  const { style, ...reset } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <MHStack stretchW style={styles.container} >
      <TextInput
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, style]} {...reset}
      />
      <MImage style={{ position: 'absolute', top: '50%', right: 15, transform: [{ translateY: '-50%' } as unknown as TranslateYTransform] }} />
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    height: 65,
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative'
  }
});
