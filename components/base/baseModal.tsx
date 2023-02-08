import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Modal, Pressable, StyleSheet, TouchableWithoutFeedback, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import { IconModalClose } from '../../lib/imageDefine';
import MImage from '../baseUI/mImage';
import { ModalCloseButton } from '../baseUI/modalCloseButton';
import MVStack from '../baseUI/mVStack';

export const BaseModal = (props: ViewProps & { visible?: boolean, isFullScreen?: boolean, isAnim?: boolean, hideModal: () => void, contentHeight?: number, contentStyle?: any }) => {
  const screenHeight = Dimensions.get('screen').height;

  let { visible, hideModal, isFullScreen, isAnim = true, contentHeight = screenHeight, contentStyle = {} } = props;
  let marginTop = Math.max(screenHeight - contentHeight, 100);
  const [isStartHide, setIsStartHide] = useState(false);

  const backgroundFadeAnim = useRef(new Animated.Value(0)).current;
  const isAdapterWeb = useAdapterWeb();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    // console.log(size[1]);
    if (!visible) {
      backgroundFadeAnim.setValue(0);
      setIsStartHide(false);
    } else {
      Animated.timing(backgroundFadeAnim, {
        easing: Easing.quad,
        toValue: 0.15,
        duration: 200,
        delay: 150,
        useNativeDriver: false
      }).start();
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
    setIsStartHide(true);
    // backgroundFadeAnim.setValue(0);
    setTimeout(() => {
      hideModal();
    }, 20);
  }

  return (
    <Modal
      transparent={true}
      animationType={isAnim ? 'slide' : 'none'}
      visible={visible}
    // presentationStyle='pageSheet'
    >

      <MVStack stretchW stretchH style={{ justifyContent: 'center', alignItems: 'center' }} >

        {!isStartHide && (
          <TouchableWithoutFeedback onPress={onBackClick}>
            <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgb(0,0,0)', opacity: backgroundFadeAnim }}>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}

        <MVStack stretchW stretchH style={[styles.content, contentStyle, adapterStyle]}>
          {
            props.children
          }
          <ModalCloseButton onClose={onBackClick} />
        </MVStack>
      </MVStack>
    </Modal>
  );
};



const styles = StyleSheet.create({
  content: {
    backgroundColor: '#F7F7F7', paddingVertical: 15, alignItems: 'center', flex: 1, position: 'relative'
  }
});