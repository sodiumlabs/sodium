import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from '../../lib/data/auth';
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";

export function ProfileScreen() {
  const auth = useAuth();
  const dimension = useDimensionSize();
  // const nav = useNavigation();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Profile" />

            <MVStack stretchW style={styles.item}>
              <MText style={styles.title} >Google</MText>
              <MText>xxxxxxxxxx@gmail.com</MText>
            </MVStack>

            <MVStack stretchW style={styles.item}>
              <MText style={styles.title}>Public Address</MText>
              <MText>{auth.blockchainAddress}</MText>
            </MVStack>


            <MVStack stretchW style={styles.item}>
              <MText style={styles.title}>ENS</MText>
              <MText style={{ marginBottom: 6 }}>No reverse record found.</MText>
              <MText style={styles.title}>Last check on</MText>
              <MText>2022/12/1 11:11:20</MText>
            </MVStack>
            <Spacer />
            <Information />
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
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EEF0F2'
  },
  container: {
    // marginVertical: 80,
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
  }
});