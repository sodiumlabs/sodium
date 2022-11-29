import { View, Button, Text, StyleSheet } from "react-native";
import usePost from "../../src/api/Test";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";



export function WalletScreen(props: { navigation: { push: (arg0: string) => void; setOptions: (arg0: { title: string; }) => void; }; }) {

  const query = usePost(1);

  return (
    <BaseScreen>
      <View style={styles.header} />
      <MText>{query.isLoading ? "loading" : "Home Screen"}</MText>
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
  header: {
    height: 80
  }
});