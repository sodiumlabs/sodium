import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import MText from './mText';

export default function MButton(props: PressableProps & { title: string, isLoading?: boolean }) {
  const { style, title, isLoading, ...reset } = props;
  return (
    <Pressable style={[localStyles.button, style as StyleProp<ViewStyle>]} {...reset}>
      {
        isLoading ? (
          <ActivityIndicator size='small' color="#0000ff" />
        ) : (
          <MText> {title} </MText>
        )
      }

    </Pressable>
  )
}

const localStyles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#bbb',
    paddingVertical: 6,
    paddingHorizontal: 6
  }
})
