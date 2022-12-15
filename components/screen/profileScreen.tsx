import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { useAuth } from '../../lib/data/auth';

export function ProfileScreen() {
  const auth = useAuth();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Profile</MText>

          <MVStack stretchW style={styles.item}>
            <MText>Google</MText>
            <MText>xxxxxxxxxx@gmail.com</MText>
          </MVStack>

          <MVStack stretchW style={styles.item}>
            <MText>Public Address</MText>
            <MText>{auth.blockchainAddress}</MText>
          </MVStack>


          <MVStack stretchW style={styles.item}>
            <MText>ENS</MText>
            <MText>No reverse record found.</MText>
            <MText>Last check on</MText>
            <MText>2022/12/1 11:11:20</MText>
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