import { ScrollView, StyleSheet } from "react-native";
import { AuthData, fixWidth } from "../../lib/define";
import { eColor } from "../../lib/globalStyles";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { SessionItem } from "../item/sessionItem";
import { UseTopCenterScale } from "../base/scaleInit";
import { useEffect, useState } from "react";
import { getAuthService, Session } from "../../lib/auth";
import { useAuth } from "../../lib/data/authAtom";
import { ethers } from "ethers";

export function SessionScreen() {
  const dimension = useDimensionSize();
  const topCenterStyle = UseTopCenterScale();
  const auth = useAuth();

  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async (_auth: AuthData) => {
    const authService = getAuthService();
    const rv = await authService.fetchSessions({
      accountId: _auth.blockchainAddress.toLocaleLowerCase(),
    });
    setSessions(rv.sessions);
  }

  const onLogout = async (session: Session) => {
    const authService = getAuthService();
    const messageHash = ethers.utils.id(`signout${session.sessionKey.toLowerCase()}`);
    const sig = await auth.session.sessionKeyOwner.signMessage(messageHash);
    await authService.removeSession({
      accountId: auth.blockchainAddress.toLocaleLowerCase(),
      sessionKey: session.sessionKey.toLocaleLowerCase(),
      sig: sig
    });
    setSessions((sessions) => {
      return sessions.filter((s) => s.sessionKey !== session.sessionKey);
    });
  }

  useEffect(() => {
    if (auth.isLogin) {
      fetchSessions(auth);
    }
  }, [auth])

  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}>
            <ScreenTitle title="Active Sessions" />
            <MText numberOfLines={null}>You're currently signed in to your sodium wallet on these sessions.Pay close attention and make sure to remove sessions you are no longer using for better security.</MText>
            <MHStack stretchW style={{ marginTop: 20 }}>
              <MText style={{ color: eColor.GrayContentText }} >Session Keys({sessions.length})</MText>
            </MHStack>
            {
              sessions.map((session, index) => {
                let isSelected = false;
                if (auth.session) {
                  isSelected = auth.session.sessionKeyOwnerAddress.toLocaleLowerCase() === session.sessionKey;
                }

                return <SessionItem onLogout={onLogout} isSelected={isSelected} key={index} session={session} />
              })
            }
            <MHStack style={{ marginBottom: 50 }} />

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