import { useRef, useEffect } from 'react';
import { Animated, Easing, Modal, TouchableWithoutFeedback, View, ViewProps } from 'react-native';
import MVStack from '../baseUI/mVStack';

export const BaseModal = (props: ViewProps & { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      fadeAnim.setValue(0);
    } else {
      Animated.timing(fadeAnim, {
        easing: Easing.quad,
        toValue: 0.1,
        duration: 300,
        delay: 100,
        useNativeDriver: false
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType='slide'
      visible={visible}
    // presentationStyle='pageSheet'
    >

      <MVStack stretchW stretchH style={{ justifyContent: 'center', alignItems: 'center' }} >

        <TouchableWithoutFeedback onPress={() => hideModal()}>
          <Animated.View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgb(0,0,0)', opacity: fadeAnim }}>
          </Animated.View>
        </TouchableWithoutFeedback>

        <MVStack stretchW stretchH style={{ maxWidth: 600, marginTop: 300, backgroundColor: '#888', padding: 15, alignItems: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          {
            props.children
          }
        </MVStack>
      </MVStack>
    </Modal>
  );
};
