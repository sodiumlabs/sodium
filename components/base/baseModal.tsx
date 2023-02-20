import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, Easing, Modal, StyleSheet, TouchableWithoutFeedback, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import { useDimensionSize } from '../../lib/hook/dimension';
import { ModalCloseButton } from '../baseUI/modalCloseButton';
import MVStack from '../baseUI/mVStack';

export const BaseModal = (props: ViewProps & { visible?: boolean, isFullScreen?: boolean, isAnim?: boolean, hideModal: () => void, contentHeight?: number, contentStyle?: any }) => {
  const screenHeight = Dimensions.get('screen').height;

  let { visible, hideModal, isFullScreen, isAnim = true, contentHeight = screenHeight, contentStyle = {} } = props;
  let marginTop = Math.max(screenHeight - contentHeight, 100);
  // const [isStartHide, setIsStartHide] = useState(false);
  const [dimensionW, dimensionH] = useDimensionSize();

  const backgroundFadeAnim = useRef(new Animated.Value(0)).current;
  const backgroundPosAnim = useRef(new Animated.Value(0)).current;
  const isAdapterWeb = useAdapterWeb();
  const insets = useSafeAreaInsets();

  // 'visible' is the player request to hide and show
  // 'uiVisible' is the real hiding and display of Modal Windows
  const [uiVisible, setUiVisible] = useState(false);
  const [isTweening, setIsTweening] = useState(false);

  const showAnim = () => {
    if (uiVisible) return;
    if (isTweening) return;
    setIsTweening(true);
    setUiVisible(true);
    backgroundPosAnim.setValue(dimensionH);
    // console.log("show");

    Animated.timing(backgroundFadeAnim, {
      easing: Easing.quad,
      toValue: 0.15,
      duration: 300,
      useNativeDriver: false
    }).start();

    Animated.timing(backgroundPosAnim, {
      easing: Easing.quad,
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      setIsTweening(false);
    });
  }

  const hideAnim = () => {
    if (!uiVisible) return;
    if (isTweening) return;
    setIsTweening(true);
    // console.log("hide");
    // debugger
    // console.log("hidehidehidehidehide");
    Animated.timing(backgroundFadeAnim, {
      easing: Easing.quad,
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();

    Animated.timing(backgroundPosAnim, {
      easing: Easing.quad,
      toValue: dimensionH,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      hideModal();
      setUiVisible(false);
      setIsTweening(false);
    });
  }

  useEffect(() => {
    if (!visible) {
      hideAnim();
    } else {
      showAnim();
    }
  }, [visible]);

  const adapterStyle = useMemo(() => {
    if (isAdapterWeb) {
      return {
        maxWidth: isFullScreen ? 'auto' : fixWidth,
        marginVertical: isFullScreen ? 0 : marginTop / 2,
        borderRadius: isFullScreen ? 0 : 15
      }
    }

    return {
      maxWidth: isFullScreen ? 'auto' : fixWidth,
      marginTop: isFullScreen ? 0 : marginTop,
      paddingBottom: insets.bottom,
      borderTopLeftRadius: isFullScreen ? 0 : 15,
      borderTopRightRadius: isFullScreen ? 0 : 15,
    }
  }, [isAdapterWeb, marginTop]);

  const onBackClick = () => {
    hideAnim();
  }

  useEffect(() => {
    // if (!visible) return;
    const hardwareBackPress = (): boolean => {
      onBackClick();
      return true;
    }
    BackHandler.addEventListener("hardwareBackPress", hardwareBackPress);
    return BackHandler.removeEventListener("hardwareBackPress", hardwareBackPress);
  }, [])

  return (
    // <MVStack stretchH stretchW style={{ backgroundColor: 'transparent' }} >

    <Modal
      transparent={true}
      // animationType={isAnim ? 'slide' : 'none'}
      visible={uiVisible}
    // presentationStyle='pageSheet'
    >

      <MVStack stretchW stretchH style={{ justifyContent: 'center', alignItems: 'center' }} >

        <TouchableWithoutFeedback onPress={onBackClick}>
          <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgb(0,0,0)', opacity: backgroundFadeAnim }}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.content, contentStyle, adapterStyle, { transform: [{ translateY: backgroundPosAnim }] }]} >
          {
            props.children
          }
          <ModalCloseButton onClose={onBackClick} />
        </Animated.View>
      </MVStack>
    </Modal>
    // </MVStack>
  );
};



const styles = StyleSheet.create({
  content: {
    backgroundColor: '#F7F7F7', paddingVertical: 15, alignItems: 'center', flex: 1, position: 'relative'
  }
});