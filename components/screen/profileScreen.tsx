import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function ProfileScreen() {
  return (
    <BaseScreen isNavigationBarBack >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>Profile</MText>

        <MVStack stretchW style={styles.item}>
          <MText>Google</MText>
          <MText>xxxxxxxxxx@gmail.com</MText>
        </MVStack>

        <MVStack stretchW style={styles.item}>
          <MText>Public Address</MText>
          <MText>0xa085ac63AfFe1cB76e5Fb23Aad567cAB8E51e9Cc</MText>
        </MVStack>


        <MVStack stretchW style={styles.item}>
          <MText>ENS</MText>
          <MText>No reverse record found.</MText>
          <MText>Last check on</MText>
          <MText>2022/12/1 11:11:20</MText>
        </MVStack>

      </MVStack>
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
  }
});