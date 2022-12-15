import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import MText from './mText';

export default function MButton(props: PressableProps & { stretchW?: boolean, title: string, isLoading?: boolean }) {
  const { style, title, stretchW, isLoading, ...reset } = props;
  const stretchWidth = {
    width: stretchW ? '100%' : 'auto'
  }
  return (
    <Pressable style={[localStyles.button, stretchWidth, style as StyleProp<ViewStyle>]} {...reset}>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(200,200,200,1)',
    paddingVertical: 6,
    paddingHorizontal: 6
  }
})
