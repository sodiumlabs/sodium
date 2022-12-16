import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { useAuth } from '../../lib/data/auth';
import MButton from "../baseUI/mButton";
import { navigation } from "../base/navigationInit";
import { Screens } from "../../lib/define";

export function SecurityScreen() {
  const auth = useAuth();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Security</MText>
          <MVStack>
            <MText>Two-factor authentication</MText>
            <MButton title={"Configured: Authenticator app"} onPress={() => navigation.navigate(Screens.SetupAuth)} />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 15,
    width: '100%'
  },
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
});