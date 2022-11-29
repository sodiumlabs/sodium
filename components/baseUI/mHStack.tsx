



import { StyleSheet, View, ViewProps } from 'react-native';

export default function MHStack(props: ViewProps) {
  const { style, ...reset } = props;
  return (
    <View style={[styles.container, style]} {...reset} >
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});
