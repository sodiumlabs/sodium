



import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MHStack from './mHStack';

export default function MInput(props: TextInputProps) {
  const { style, ...reset } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fucusStyle = {
    borderColor: isFocused ? eColor.Blue : eColor.Border,

  }

  return (
    <MHStack stretchW style={styles.container} >
      <TextInput
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, globalStyle.whiteBorderWidth, style, fucusStyle]} {...reset}
      />
      {/* <MImage style={{ position: 'absolute', top: '50%', right: 15, transform: [{ translateY: '-50%' } as unknown as TranslateYTransform] }} /> */}
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    height: 65,
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative',

  }
});
