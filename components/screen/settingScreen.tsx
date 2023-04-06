import { ScrollView, StyleSheet } from "react-native";
import { useQueryAllowances } from "../../lib/api/allowance";
import { Screens, fixWidth } from "../../lib/define";
import { eColor } from '../../lib/globalStyles';
import { useAdapterScale } from "../../lib/hook";
import { useDimensionSize } from "../../lib/hook/dimension";
import { useCurrentChainId } from "../../lib/network";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigationRef } from "../base/navigation";
import { Spacer } from "../base/spacer";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import SettingItem from "../item/settingItem";
import GearSvg from '../svg/gearSvg';
import PhoneSvg from '../svg/phoneSvg';
import ProfileSvg from "../svg/profileSvg";


export function SettingScreen() {
  const dimension = useDimensionSize();
  const { isInited, handleLayout, scaleStyleCenter: scaleStyle } = useAdapterScale();
  const currentChainId = useCurrentChainId();
  const [queryAllowance, allowances, onScroll] = useQueryAllowances(currentChainId);

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack onLayout={handleLayout} stretchW style={[styles.container, { minHeight: dimension[1] }, scaleStyle]}>
            {isInited && (<>
              <ScreenTitle title="Setting" />
              <SettingItem source={<ProfileSvg />} onPress={() => navigationRef.navigate(Screens.Profile)} >
                <MText style={{ fontWeight: '700' }} >Profile</MText>
              </SettingItem>

              <SettingItem source={<GearSvg />} onPress={() => navigationRef.navigate(Screens.Security)} >
                <MText style={{ fontWeight: '700' }}>Security</MText>
              </SettingItem>


              <SettingItem source={<PhoneSvg />} onPress={() => navigationRef.navigate(Screens.Session)} >
                <MText style={{ fontWeight: '700' }}>Active Sessions</MText>
                <MText style={{ color: eColor.GrayContentText, marginTop: 2 }}> 2 Active Sessions</MText>
              </SettingItem>

              <SettingItem source={<PhoneSvg />} onPress={() => navigationRef.navigate(Screens.Allowance)} >
                <MText style={{ fontWeight: '700' }}>Allowance</MText>
                <MText style={{ color: eColor.GrayContentText, marginTop: 2 }}> {allowances.length} Active Allowances</MText>
              </SettingItem>
              <Spacer />
              <Information />
            </>)}
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    // marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});