import { Button, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";

export function HistoryScreen(props: { navigation: { popToTop: () => void; }; }) {
  return (
    <BaseScreen>
      <MText style={styles.header} />
      <MText>History Screen</MText>
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
  header: {
    height: 80
  }
});