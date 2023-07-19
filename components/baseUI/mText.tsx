import { Text, TextProps, StyleSheet } from 'react-native';


export default function MText(props: TextProps & { fontSize?: number }) {
  const { fontSize, style, ...reset } = props;
  const font = {
    fontSize: fontSize || 12,
  }
  return (
    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.container, style, font]}  {...reset}> {props.children} </Text>
  )
}



const styles = StyleSheet.create({
  container: {
    // fontFamily: "Roboto"
    // color: '#FFFFFF'
  }
});
