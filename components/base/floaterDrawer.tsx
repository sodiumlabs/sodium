import { useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native';
import { useQueryNetwork } from '../../lib/api/network';
import { loginOut, useAuth } from '../../lib/data/auth';
import { Screens } from '../../lib/define';
import CopyButton from '../baseUI/copyButton';
import MAvatar from '../baseUI/mAvatar';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { LogoutLoading } from '../full/logoutLoading';
import { showUpdateFullScreenModal } from './modalInit';
import { navigate, navigationRef } from './navigationInit';

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
  const authData = useAuth();
  const [queryNetwork, network] = useQueryNetwork();

  const onSettingsClick = () => {
    foldAnim();
    navigate(Screens.Setting);
  }
  const onLogoutClick = async () => {
    showUpdateFullScreenModal(true, <LogoutLoading />);
    await loginOut();
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
                    <Pressable style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: '#999', height: '100%', justifyContent: 'center' }} onPress={() => navigationRef.goBack()}>
                      <MImage size={12} />
                    </Pressable>
                  )
                }
                <MAvatar style={{ marginHorizontal: 10 }} />
                <MText style={{ flex: 1 }} >{authData.blockchainAddress}</MText>
                <MImage size={24} style={{ margin: 10 }} />
              </MHStack>
            </Pressable>
          </Animated.View>
        }
        <Animated.View style={{ opacity: contentOpacityAnim }}>
          <MVStack style={{ padding: 10, transform: [{ translateY: -minHeaderHeight }] }} >
            <MHStack style={{ flex: 1 }} >
              <MAvatar style={{ marginHorizontal: 10 }} size={48} />
              <MVStack style={{ flex: 1 }}>
                <MText >{authData.blockchainAddress}</MText>
                <MHStack >
                  <CopyButton style={{ 'margin': 5 }} copyText={authData.blockchainAddress} />
                  <MButton onPress={undefined} style={{ 'margin': 5, borderRadius: 10 }}>
                    <MText>Receive</MText>
                  </MButton>
                </MHStack>
              </MVStack>
              <MVStack >
                <Pressable onPress={() => foldAnim()}>
                  <MImage size={24} />
                </Pressable>
              </MVStack>
            </MHStack>

            <Pressable>
              <MVStack style={styles.email}>
                <MText>Google</MText>
                <MText>Wuyiming27094@gmail.com</MText>
              </MVStack>
            </Pressable>

            <Pressable>
              <MHStack style={styles.connected}>
                <MImage size={10} style={{ marginRight: 10 }} />
                <MVStack style={{ flex: 1 }}>
                  <MText>Connected</MText>
                  <MText>{network?.name}</MText>
                </MVStack>
                <MImage size={10} />
              </MHStack>
            </Pressable>

            <MHStack >
              <MButton onPress={onSettingsClick} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}>
                <MImage size={14} style={{ marginRight: 6 }} />
                <MText>Settings</MText>
              </MButton>
              <MButton onPress={onLogoutClick} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}>
                <MImage size={14} style={{ marginRight: 6 }} />
                <MText>Sign Out</MText>
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
    borderRadius: 10,
    backgroundColor: '#aaa',
    overflow: 'hidden',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(200,200,200,1)',
  },
  email: {
    flex: 1,
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 8
  },
  connected: {
    flex: 1,
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center'
  },
});