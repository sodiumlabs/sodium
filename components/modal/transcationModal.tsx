import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import MVStack from '../baseUI/mVStack';
import MText from '../baseUI/mText';
import MHStack from '../baseUI/mHStack';
import { Divider } from '@ui-kitten/components';
import MButton from '../baseUI/mButton';
import { BaseModal } from '../base/baseModal';

export const TranscationModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');

  return (
    <BaseModal
      visible={visible}
      hideModal={hideModal}
    >
      <ScrollView>
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
      </ScrollView>

    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});