import { StyleSheet, View, ViewProps } from 'react-native';

export default function MVStack(props: ViewProps & { stretchW?: boolean, stretchH?: boolean }) {
  const { style, stretchW, stretchH, ...reset } = props;
  const stretchWidth = {
    width: stretchW ? '100%' : 'auto'
  }
  const stretchHeight = {
    height: stretchH ? '100%' : 'auto'
  }
  return (
    <View style={[styles.container, stretchWidth, stretchHeight, style]} {...reset} >
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
});
