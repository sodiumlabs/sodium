



import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import MHStack from './mHStack';

export default function MInput(props: TextInputProps) {
  const { style, ...reset } = props;
  return (
    <MHStack stretchW style={styles.container}>
      <TextInput style={[styles.input, style]} {...reset} />
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
  }
});
