import { useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native';
import { useQueryNetwork } from '../../lib/api/network';
import { loginOut, useAuth } from '../../lib/data/auth';
import { Screens } from '../../lib/define';
import CopyButton from '../baseUI/copyButton';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { showUpdateFullScreenModal } from './modalInit';
import { navigation } from './navigationInit';

export default function FloaterDrawer(props: { hasNavigationBarBack: boolean }) {

  // ------ ------ ------ ------ anim  ------ ------ ------ ------ ------
  const minHeaderHeight = 44;
  const headerHeightAnim = useRef(new Animated.Value(minHeaderHeight)).current;
  const [viewHeight, setViewHeight] = useState(-1);
  const [isFold, setIsFold] = useState(true);

  const explanceAnim = () => {
    if (viewHeight <= 0) {
      return;
    }
    Animated.timing(headerHeightAnim, {
      easing: Easing.sin,
      toValue: viewHeight,
      duration: 300,
      useNativeDriver: false
    }).start(() => setIsFold(false));
  }
  const foldAnim = () => {

    Animated.timing(headerHeightAnim, {
      easing: Easing.sin,
      toValue: minHeaderHeight,
      duration: 300,
      useNativeDriver: false
    }).start(() => setIsFold(true));
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
    navigation.navigate(Screens.Setting);
  }
  const onLogoutClick = async () => {
    showUpdateFullScreenModal(true, <MText>log out</MText>);
    await loginOut();
    showUpdateFullScreenModal(false);
  }


  return (
    <Animated.View style={[styles.animContainer, { height: headerHeightAnim }]}>
      <MVStack stretchW onLayout={onLayout} pointerEvents='auto' >
        {
          isFold && (
            <Pressable onPress={onFoldBtnClick} style={{ height: minHeaderHeight }}>
              <MHStack stretchW stretchH style={{ alignItems: 'center', flex: 1 }} >
                {
                  props.hasNavigationBarBack && (
                    <Pressable style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: '#999', height: '100%', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                      <MImage size={12} />
                    </Pressable>
                  )
                }
                <MImage size={24} style={{ marginHorizontal: 10 }} />
                <MText style={{ flex: 1 }} >{authData.blockchainAddress}</MText>
                <MImage size={24} style={{ margin: 10 }} />
              </MHStack>
            </Pressable>
          )
        }

        <MVStack style={{ padding: 10 }}>
          <MHStack style={{ flex: 1 }} >
            <MImage size={48} />
            <MVStack style={{ flex: 1 }}>
              <MText >{authData.blockchainAddress}</MText>
              <MHStack >
                <CopyButton style={{ 'margin': 5 }} copyText={authData.blockchainAddress} />
                <MButton onPress={undefined} style={{ 'margin': 5, borderRadius: 15 }}>
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
      </MVStack>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  animContainer: {
    borderRadius: 15,
    backgroundColor: '#aaa',
    overflow: 'hidden',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    borderRadius: 15,
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