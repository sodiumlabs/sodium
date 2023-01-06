



import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MLineLR from './mLineLR';
import MText from './mText';
import MVStack from './mVStack';

export default function MInput(props: TextInputProps & { errorTip?: string }) {
  const { errorTip, style, ...reset } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fucusStyle = {
    borderColor: isFocused ? eColor.Blue : eColor.Border,

  }

  return (
    <MVStack stretchW style={styles.container} >
      <TextInput
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, globalStyle.whiteBorderWidth, style, fucusStyle]} {...reset}
      />
      {/* <MImage style={{ position: 'absolute', top: '50%', right: 15, transform: [{ translateY: '-50%' } as unknown as TranslateYTransform] }} /> */}
      {
        errorTip && (<MLineLR right={<MText style={{ color: eColor.Red, marginBottom: 10 }} >{errorTip}</MText>} />)
      }

    </MVStack>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
  },
  input: {
    height: 65,
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative',

  }
});
