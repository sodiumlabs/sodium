



import { StyleSheet, TextInput, TextInputProps, TranslateYTransform } from 'react-native';
import MHStack from './mHStack';
import MImage from './mImage';

export default function MInput(props: TextInputProps) {
  const { style, ...reset } = props;
  return (
    <MHStack stretchW style={styles.container}>
      <TextInput style={[styles.input, style]} {...reset} underlineColorAndroid={'#999'} />
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
    borderRadius: 15,
    height: 65,
    width: '100%',
    paddingHorizontal: 20,
    position: 'relative'
  }
});
