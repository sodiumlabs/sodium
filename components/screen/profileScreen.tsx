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
import { globalStyle, eColor } from '../../lib/globalStyles';
import { useProfile } from '../../lib/data/profile';

export function ProfileScreen() {
  const auth = useAuth();
  const profile = useProfile();
  const dimension = useDimensionSize();
  // const nav = useNavigation();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Profile" />

            <MVStack stretchW style={[styles.item, globalStyle.whiteBorderWidth]}>
              <MText style={styles.title} >{profile.authorizedSource}</MText>
              <MText style={{ color: eColor.GrayContentText }} >{profile.userName || 'unknown'}</MText>
            </MVStack>

            <MVStack stretchW style={[styles.item, globalStyle.whiteBorderWidth]}>
              <MText style={styles.title}>Public Address</MText>
              <MText style={{ color: eColor.GrayContentText }}>{auth.blockchainAddress}</MText>
            </MVStack>


            {/* <MVStack stretchW style={[styles.item, globalStyle.whiteBorderWidth]}>
              <MText style={styles.title}>ENS</MText>
              <MText style={{ marginBottom: 6, color: eColor.GrayContentText }}>No reverse record found.</MText>
              <MText style={styles.title}>Last check on</MText>
              <MText style={{ color: eColor.GrayContentText }}>2022/12/1 11:11:20</MText>
            </MVStack> */}
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
    width: '100%',
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