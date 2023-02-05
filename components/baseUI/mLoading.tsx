import { ActivityIndicator, View, Text } from "react-native"

export const MLoading = (props: { color?: string }) => {
  const { color } = props;
  return (
    <View><Text>loading...</Text></View>
    // <ActivityIndicator size='small' color={color || 'blue'} />
  )
}