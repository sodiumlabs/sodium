import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions, Image, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import MVStack from '../baseUI/mVStack';
import MText from '../baseUI/mText';
import MHStack from '../baseUI/mHStack';
import { Divider } from '@ui-kitten/components';
import MButton from '../baseUI/mButton';

export const TranscationModal = (props: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>> }) => {
  const { visible, setVisible } = props;
  // const { width, height } = Dimensions.get('window');

  return (
    <Modal
      transparent={true}
      animationType='slide'
      visible={visible}
    // presentationStyle='pageSheet'
    >

      <MVStack stretchW stretchH style={{ justifyContent: 'center', alignItems: 'center' }} >

        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,.1)' }} />
        </TouchableWithoutFeedback>

        <MVStack stretchW stretchH style={{ maxWidth: 600, marginTop: 200, backgroundColor: '#888', padding: 15, alignItems: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
          <MText>Transaction Details</MText>
          <MVStack stretchW style={{ borderRadius: 15, backgroundColor: '#aaa', padding: 15 }}>
            <MHStack style={{ flex: 1, alignItems: 'center' }}>
              <MText style={{ flex: 1 }}>Received(1/1)</MText>
              <Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />
            </MHStack>

            <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
              <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
              <MText style={{ flex: 1 }}>USDC</MText>
              <MText >1.46666 USDC</MText>
            </MHStack>

            <Divider />

            <MVStack style={styles.marginV}>
              <MText style={{ marginVertical: 5 }}>To</MText>
              <MHStack stretchW style={{ padding: 15, backgroundColor: '#fff', borderRadius: 15 }}>
                <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
                <MText style={{ flex: 1 }}>0x8BB759Bb68995343FF1e9D57Ac85Ff5c5Fb79</MText>
                <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
              </MHStack>
            </MVStack>
          </MVStack>

          <MButton styles={{ width: '100%', marginVertical: 20 }} title={'View On Polygon'}></MButton>

          <MVStack stretchW style={styles.marginV}>
            <MText>Status</MText>
            <MText >Complete</MText>
            <Divider />

            <MText>Date & Time</MText>
            <MText>November 24, 2022 2:50:33 pm</MText>
            <Divider />

            <MText>Transaction Hash</MText>
            <MText>0x805b5aa7018dad01a082eff3d23c218d8fe473daca4b6d4d0021de1d652c652c</MText>
            <Divider />

            <MText>Network</MText>
            <MText>Polygon</MText>
          </MVStack>
        </MVStack>


      </MVStack>
    </Modal>
  );
};

const styles = StyleSheet.create({

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  marginV: {
    marginVertical: 20
  }
});