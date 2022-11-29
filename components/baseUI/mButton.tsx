import { Pressable, StyleProp, StyleSheet, TextStyle } from 'react-native';
import MText from './mText';

export default function MButton(props: { onPress: any; title: string; styles: StyleProp<TextStyle> }) {
  const { onPress, title, styles = {} } = props;
  return (
    <Pressable style={[localStyles.button, styles]} onPress={onPress}>
      <MText> {title} </MText>
    </Pressable>
  )
}

const localStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    paddingVertical: '6px',
    paddingHorizontal: '6px'
  }
})
