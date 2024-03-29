import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, Screens } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconAllowance, IconProfile, IconSecurity, IconSessions } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigationRef } from "../base/navigation";
import { Spacer } from "../base/spacer";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import SettingItem from "../item/settingItem";
import { eColor } from '../../lib/globalStyles';
import { useQueryAllowances } from "../../lib/api/allowance";
import ProfileSvg from "../svg/profileSvg";
import GearSvg from '../svg/gearSvg';
import PhoneSvg from '../svg/phoneSvg';
import { useCurrentChainId } from "../../lib/network";
import { UseTopCenterScale } from "../base/scaleInit";
import { getAuthService, Session } from "../../lib/auth";
import { useAuth } from "../../lib/data/authAtom";
import { useEffect, useState } from "react";

export function SettingScreen() {
  const dimension = useDimensionSize();
  const currentChainId = useCurrentChainId();
  const [queryAllowance, allowances, onScroll] = useQueryAllowances(currentChainId);
  const topCenterStyle = UseTopCenterScale();
  const auth = useAuth();

  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    const authService = getAuthService();
    const rv = await authService.fetchSessions({
      accountId: auth.blockchainAddress.toLocaleLowerCase(),
    });
    setSessions(rv.sessions || []);
  }

  useEffect(() => {
    if (auth.isLogin) {
      fetchSessions();
    }
  }, [auth])

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}>
            <ScreenTitle title="Setting" />
            <SettingItem source={<ProfileSvg />} onPress={() => navigationRef.navigate(Screens.Profile)} >
              <MText style={{ fontWeight: '700' }} >Profile</MText>
            </SettingItem>

            <SettingItem source={<GearSvg />} onPress={() => navigationRef.navigate(Screens.Security)} >
              <MText style={{ fontWeight: '700' }}>Security</MText>
            </SettingItem>

            <SettingItem source={<PhoneSvg />} onPress={() => navigationRef.navigate(Screens.Session)} >
              <MText style={{ fontWeight: '700' }}>Active Sessions</MText>
              <MText style={{ color: eColor.GrayContentText, marginTop: 2 }}> {sessions?.length || 0} Active Sessions</MText>
            </SettingItem>

            <SettingItem source={<PhoneSvg />} onPress={() => navigationRef.navigate(Screens.Allowance)} >
              <MText style={{ fontWeight: '700' }}>Allowance</MText>
              <MText style={{ color: eColor.GrayContentText, marginTop: 2 }}> {allowances?.length || 0} Active Allowances</MText>
            </SettingItem>
            <Spacer />
            <Information />
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