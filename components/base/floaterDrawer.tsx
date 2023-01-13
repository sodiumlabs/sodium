import { useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native';
import { useQueryNetwork } from '../../lib/api/network';
import { waitTime } from '../../lib/common/common';
import { loginOut, useAuth } from '../../lib/data/auth';
import { Screens } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { IconArrowL, IconForkClose, IconMore, IconSettings, IconSignout } from '../../lib/imageDefine';
import CopyButton from '../baseUI/copyButton';
import MAvatar from '../baseUI/mAvatar';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { LogoutLoading } from '../full/logoutLoading';
import { showUpdateFullScreenModal } from './modalInit';
import { navigate, navigationRef } from './navigationInit';
import { useProfile } from '../../lib/data/profile';

export default function FloaterDrawer(props: { hasNavigationBarBack: boolean }) {

  // ------ ------ ------ ------ anim  ------ ------ ------ ------ ------
  const minHeaderHeight = 44;
  const backgroundHeightAnim = useRef(new Animated.Value(minHeaderHeight)).current;
  const headerOffsetAnim = useRef(new Animated.Value(0)).current;
  const contentOpacityAnim = useRef(new Animated.Value(0)).current;
  const [viewHeight, setViewHeight] = useState(-1);
  const [isFold, setIsFold] = useState(true);

  const explanceAnim = () => {
    if (viewHeight <= 0) {
      return;
    }
    Animated.timing(headerOffsetAnim, {
      easing: Easing.linear,
      toValue: -50,
      duration: 100,
      useNativeDriver: false
    }).start();

    Animated.timing(backgroundHeightAnim, {
      easing: Easing.cubic,
      toValue: viewHeight,
      duration: 250,
      useNativeDriver: false,
      delay: 100
    }).start(() => setIsFold(false));

    Animated.timing(contentOpacityAnim, {
      easing: Easing.cubic,
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
      delay: 200
    }).start();


  }
  const foldAnim = () => {
    Animated.timing(contentOpacityAnim, {
      easing: Easing.cubic,
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
    Animated.timing(backgroundHeightAnim, {
      easing: Easing.cubic,
      toValue: minHeaderHeight,
      duration: 250,
      useNativeDriver: false,
      delay: 200
    }).start();

    Animated.timing(headerOffsetAnim, {
      easing: Easing.linear,
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
      delay: 400
    }).start(() => setIsFold(true))
  }

  const onFoldBtnClick = () => {
    if (isFold) {
      explanceAnim();
    } else {
      foldAnim();
    }
  }

  const onLayout = (event: LayoutChangeEvent) => {
    setViewHeight(event.nativeEvent.layout.height - minHeaderHeight);
    // explance(event.nativeEvent.layout.height, 0);
  }


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


  return (
    <Animated.View style={[styles.animContainer, { height: backgroundHeightAnim }]}>
      <MVStack stretchW onLayout={onLayout} pointerEvents='auto' >
        {
          <Animated.View style={{ zIndex: 100, transform: [{ translateY: headerOffsetAnim }] }} >
            <Pressable onPress={onFoldBtnClick} style={{ height: minHeaderHeight, }} >
              <MHStack stretchW stretchH style={{ alignItems: 'center', flex: 1 }} >
                {
                  props.hasNavigationBarBack && (
                    <Pressable style={{ paddingLeft: 17, paddingRight: 17, backgroundColor: 'rgba(1,1,1,0.05)', height: '100%', justifyContent: 'center' }} onPress={() => navigationRef.goBack()}>
                      <MImage w={8} h={12} source={IconArrowL} />
                    </Pressable>
                  )
                }
                <MAvatar style={{ marginHorizontal: 10 }} name={auth.blockchainAddress} />
                <MText style={{ flex: 1, fontWeight: '700' }} >{auth.blockchainAddress}</MText>
                <MImage w={24} h={24} style={{ margin: 10 }} source={IconMore} />
              </MHStack>
            </Pressable>
          </Animated.View>
        }
        <Animated.View style={{ opacity: contentOpacityAnim }}>
          <MVStack style={{ padding: 10, transform: [{ translateY: -minHeaderHeight }] }} >
            <MHStack style={{ flex: 1 }} >
              <MAvatar style={{ marginHorizontal: 10 }} size={48} name={auth.blockchainAddress} />
              <MVStack style={{ flex: 1 }}>
                <MText style={{ fontWeight: '700' }} >{auth.blockchainAddress}</MText>
                <MHStack >
                  <CopyButton style={{ marginHorizontal: 5, height: 24, marginTop: 10 }} copyText={auth.blockchainAddress} />

                </MHStack>
              </MVStack>
              <MVStack >
                <Pressable onPress={() => foldAnim()}>
                  <MImage w={24} h={24} source={IconForkClose} />
                </Pressable>
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

            <MHStack >
              <MButton onPress={onSettingsClick} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}>
                <MImage w={14} h={14} style={{ marginRight: 6 }} source={IconSettings} />
                <MButtonText title={"Settings"} />
              </MButton>
              <MButton onPress={onLogoutClick} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}>
                <MImage w={12} h={10} style={{ marginRight: 6 }} source={IconSignout} />
                <MButtonText title={"Sign out"} />
              </MButton>
            </MHStack>
          </MVStack>
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
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    padding: 15,
    marginTop: 25,
    marginBottom: 15,
    borderRadius: 6
  },
  connected: {
    // flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 6
  },
});