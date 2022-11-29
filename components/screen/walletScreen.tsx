import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet } from "react-native";
import usePost from "../../src/api/Test";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";



export function WalletScreen(props: {}) {

  const query = usePost(1);
  const navigation = useNavigation();

  return (
    <BaseScreen >
      <MText>{query.isLoading ? "loading" : "Home Screen"}</MText>
      <MButton
        title="Go to History"
        // onPress={() => props.navigation.navigate('Details')}
        onPress={() => navigation.push('History')}
      // onPress={() => props.navigation.popToTop()}
      />

      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
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
  }
});