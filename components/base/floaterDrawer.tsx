import { useRef, useState, useMemo, useEffect } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, View, Platform } from 'react-native';
import { useQueryNetwork } from '../../lib/api/network';
import { waitTime } from '../../lib/common/common';
import { loginOut } from '../../lib/data/auth';
import { useAuth } from '../../lib/data/authAtom';
import { Screens } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { IconArrowL, IconForkClose, IconMore, IconSettings, IconSignout } from '../../lib/imageDefine';
import CopyButton from '../baseUI/copyButton';
import MAvatar from '../baseUI/mAvatar';
import MButton, { MButtomTheme } from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { LogoutLoading } from '../full/logoutLoading';
import { showUpdateFullScreenModal } from '../../lib/data/modal';
import { navigate, navigationRef } from './navigation';
import { useProfile } from '../../lib/data/profile';
import MPressable from '../baseUI/mPressable';
import SettingSvg from '../svg/settingSvg';
import SignOutSvg from '../svg/signOutSvg';
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';

const tryFoldFloaterDrawerAtom = atom(false);
export const tryFoldFloaterDrawer = () => {
  tryFoldFloaterDrawerAtom.set(!tryFoldFloaterDrawerAtom.get());
}
export default function FloaterDrawer(props: { hasNavigationBarBack: boolean }) {

  // ------ ------ ------ ------ anim  ------ ------ ------ ------ ------
  const minHeaderHeight = 44;
  const backgroundHeightAnim = useRef(new Animated.Value(minHeaderHeight)).current;
  const headerOffsetAnim = useRef(new Animated.Value(0)).current;
  const contentOpacityAnim = useRef(new Animated.Value(0)).current;
  const [viewHeight, setViewHeight] = useState(-1);
  const animRate = 0.5;
  const [isFold, setIsFold] = useState(true);
  const tryFoldFloaterDrawer = useStore(tryFoldFloaterDrawerAtom);

  const explanceAnim = () => {
    if (viewHeight <= 0) {
      return;
    }
    setIsFold(false)
    Animated.timing(headerOffsetAnim, {
      easing: Easing.linear,
      toValue: -50,
      duration: 100 * animRate,
      useNativeDriver: false
    }).start();

    Animated.timing(backgroundHeightAnim, {
      easing: Easing.cubic,
      toValue: viewHeight,
      duration: 250 * animRate,
      useNativeDriver: false,
      delay: 100 * animRate
    }).start();

    Animated.timing(contentOpacityAnim, {
      easing: Easing.cubic,
      toValue: 1,
      duration: 200 * animRate,
      useNativeDriver: false,
      delay: 200 * animRate
    }).start();


  }
  const foldAnim = () => {
    setIsFold(true)
    Animated.timing(contentOpacityAnim, {
      easing: Easing.cubic,
      toValue: 0,
      duration: 200 * animRate,
      useNativeDriver: false
    }).start();
    Animated.timing(backgroundHeightAnim, {
      easing: Easing.cubic,
      toValue: minHeaderHeight,
      duration: 250 * animRate,
      useNativeDriver: false,
      delay: 200 * animRate
    }).start();

    Animated.timing(headerOffsetAnim, {
      easing: Easing.linear,
      toValue: 0,
      duration: 100 * animRate,
      useNativeDriver: false,
      delay: 400 * animRate
    }).start()
  }

  const onFoldBtnClick = () => {
    if (isFold) {
      explanceAnim();
    } else {
      foldAnim();
    }
  }

  useEffect(() => {
    if (!isFold) {
      foldAnim();
    }
  }, [tryFoldFloaterDrawer])

  const onLayout = (event: LayoutChangeEvent) => {
    setViewHeight(event.nativeEvent.layout.height - minHeaderHeight);
  }


  // ------ ------ ------ ------back btn aim ------ ------ ------ ------ ------ ------

  const backBtnWidthAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (props.hasNavigationBarBack) {
      Animated.timing(backBtnWidthAnim, {
        easing: Easing.linear,
        toValue: 45,
        duration: 200 * animRate,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(backBtnWidthAnim, {
        easing: Easing.linear,
        toValue: 0,
        duration: 200 * animRate,
        useNativeDriver: false
      }).start();
    }

  }, [props.hasNavigationBarBack])

  // ------ ------ ------ ------service logic ------ ------ ------ ------ ------ ------
  const auth = useAuth();
  const profile = useProfile();
  const [queryNetwork, network] = useQueryNetwork();

  const onSettingsClick = () => {
    foldAnim();
    navigate(Screens.Setting);
  }
  const onLogoutClick = async () => {
    showUpdateFullScreenModal(true, <LogoutLoading />);
    await loginOut();
    await waitTime(1); // Call next frame to avoid flash screen
    showUpdateFullScreenModal(false);
  }

  const foldView = useMemo(() => {
    return (
      <Pressable onPress={onFoldBtnClick} style={{ height: minHeaderHeight, }} >
        <MHStack stretchW stretchH style={{ alignItems: 'center', flex: 1 }} >
          <Animated.View style={{ height: '100%', width: backBtnWidthAnim, overflow: 'hidden' }}  >
            <Pressable style={{ paddingHorizontal: 17, backgroundColor: '#e9ebec', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigationRef.goBack()}>
              <MImage w={8} h={12} source={IconArrowL} />
            </Pressable>
          </Animated.View>

          <MAvatar style={{ marginHorizontal: 10 }} name={auth.blockchainAddress} />
          <MText style={{ flex: 1, fontWeight: '700' }} >{auth.blockchainAddress}</MText>
          <MImage w={24} h={24} style={{ margin: 10 }} source={IconMore} />
        </MHStack>
      </Pressable>
    )
  }, [onFoldBtnClick, auth.blockchainAddress]);

  const unFoldView = useMemo(() => {
    return (
      <MVStack style={{ padding: 10, transform: [{ translateY: -minHeaderHeight }] }} >
        <MHStack style={{ height: 48 }}>
          <MAvatar style={{ marginHorizontal: 10 }} size={48} name={auth.blockchainAddress} />
          <MVStack style={{ flex: 1 }}>
            <MText style={{ fontWeight: '700' }} >{auth.blockchainAddress}</MText>
            <MHStack >
              <CopyButton style={{ marginHorizontal: 5, height: 24, marginTop: 10 }} copyText={auth.blockchainAddress} />
            </MHStack>
          </MVStack>
          <MVStack style={{ marginLeft: 10 }}>
            <MPressable onPress={() => foldAnim()}>
              <MImage w={24} h={24} source={IconForkClose} />
            </MPressable>
          </MVStack>
        </MHStack>

        <MVStack style={[styles.email]}>
          <MText  >{profile.authorizedSource}</MText>
          <MText style={{ marginTop: 5, color: "#6B6B6B" }} >{profile.userName}</MText>
        </MVStack>

        <MHStack style={[styles.connected]}>
          <MVStack style={{ flex: 1 }}>
            <MText>Connected</MText>
            <MText style={{ marginTop: 5, color: "#6B6B6B" }}>{network?.name}</MText>
          </MVStack>
        </MHStack>

        <MHStack style={{ height: 60 }}>
          <MButton imageIcon={null} theme={MButtomTheme.Grey} onPress={onSettingsClick} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}>
            <SettingSvg style={{ marginRight: 6 }} />
            <MButtonText title={"Settings"} />
          </MButton>
          <MButton imageIcon={null} theme={MButtomTheme.Grey} onPress={onLogoutClick} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}>
            <SignOutSvg style={{ marginRight: 6 }} />
            <MButtonText title={"Sign out"} />
          </MButton>
        </MHStack>
      </MVStack>
    )
  }, [auth.blockchainAddress, profile.authorizedSource, profile.userName, network?.name])

  return (
    <Animated.View style={[styles.animContainer, { height: backgroundHeightAnim }]}>
      <MVStack stretchW onLayout={onLayout}  >

        <Animated.View style={{ zIndex: 100, transform: [{ translateY: headerOffsetAnim }] }} >
          {foldView}
        </Animated.View>

        <Animated.View style={{ opacity: contentOpacityAnim }}>
          {unFoldView}
        </Animated.View>

      </MVStack>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  animContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: eColor.Border,
    borderRadius: 15,
  },
  email: {
    // flex: 1,
    height: 49, // Specify the height to avoid an onLayout trigger that causes the parent layout height to be calculated incorrectly. Because the parent layout needs to be animated
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    padding: 15,
    marginTop: 25,
    marginBottom: 15,
    borderRadius: 6
  },
  connected: {
    // flex: 1,
    height: 63,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 6
  },
});