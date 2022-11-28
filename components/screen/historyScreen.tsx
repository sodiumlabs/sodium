import { View, Button, Text, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";

export function HistoryScreen(props: { navigation: { popToTop: () => void; }; }) {
  return (
    <BaseScreen>
      <Text>History Screen</Text>
      <Button
        title="Go to top"
        onPress={() => props.navigation.popToTop()}
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