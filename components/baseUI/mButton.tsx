import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MHStack from './mHStack';

export default function MButton(props: PressableProps & { stretchW?: boolean, isLoading?: boolean }) {
  const { style, stretchW, isLoading, ...reset } = props;
  const stretchWidth = {
    width: stretchW ? '100%' : 'auto'
  }
  return (
    <Pressable style={[localStyles.button, stretchWidth, style as StyleProp<ViewStyle>]} {...reset}>
      {
        isLoading ? (
          <ActivityIndicator size='small' color="#0000ff" />
        ) : (
          <MHStack style={{ justifyContent: 'center', alignItems: 'center' }} >
            {
              props.children as React.ReactNode
            }
          </MHStack>
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
    backgroundColor: '#8B8E9E',
    paddingVertical: 6,
    paddingHorizontal: 10
  }
})
