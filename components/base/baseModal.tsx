import { useRef, useEffect, useMemo } from 'react';
import { Animated, Easing, StyleSheet, Modal, TouchableWithoutFeedback, View, ViewProps, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import MVStack from '../baseUI/mVStack';

export const BaseModal = (props: ViewProps & { visible?: boolean, isFullScreen?: boolean, isAnim?: boolean, hideModal: () => void }) => {
  const { visible, hideModal, isFullScreen, isAnim = true } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isAdapterWeb = useAdapterWeb();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (!visible) {
      fadeAnim.setValue(0);
    } else {
      Animated.timing(fadeAnim, {
        easing: Easing.quad,
        toValue: 0.15,
        duration: 300,
        delay: 100,
        useNativeDriver: false
      }).start();
    }
  }, [visible]);

  const adapterStyle = useMemo(() => {
    if (isAdapterWeb) {
      return {
        maxWidth: isFullScreen ? 'auto' : fixWidth,
        marginVertical: isFullScreen ? 0 : 100,
        borderRadius: 15
      }
    }

    return {
      maxWidth: isFullScreen ? 'auto' : fixWidth,
      marginTop: isFullScreen ? 0 : 100,
      paddingBottom: insets.bottom,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    }
  }, [isAdapterWeb]);

  return (
    <Modal
      transparent={true}
      animationType={isAnim ? 'slide' : 'none'}
      visible={visible}
    // presentationStyle='pageSheet'
    >

      <MVStack stretchW stretchH style={{ justifyContent: 'center', alignItems: 'center' }} >

        <TouchableWithoutFeedback onPress={() => hideModal()}>
          <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgb(0,0,0)', opacity: fadeAnim }}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <MVStack stretchW stretchH style={[styles.content, adapterStyle]}>
          {
            props.children
          }
          <Pressable
            onPress={() => hideModal()}
            style={styles.close}>
          </Pressable>
        </MVStack>
      </MVStack>
    </Modal>
  );
};



const styles = StyleSheet.create({
  content: {
    backgroundColor: '#888', padding: 15, alignItems: 'center', flex: 1, position: 'relative'
  },
  close: {
    backgroundColor: '#999', width: 30, height: 30, position: 'absolute', top: -40, right: 0, borderRadius: 99
  }
});