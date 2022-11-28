import { View, Button, Text, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";



export function WalletScreen(props: { navigation: { push: (arg0: string) => void; setOptions: (arg0: { title: string; }) => void; }; }) {

  // debugger
  return (
    <BaseScreen>
      <Text>Home Screen</Text>
      <Button
        title="Go to History"
        // onPress={() => props.navigation.navigate('Details')}
        onPress={() => props.navigation.push('History')}
      // onPress={() => props.navigation.popToTop()}
      />

      <Button
        title="Update the title"
        onPress={() => props.navigation.setOptions({ title: 'Updated!' })}
      />
    </BaseScreen>

  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});