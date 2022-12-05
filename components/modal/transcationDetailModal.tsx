import { ScrollView, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { Divider } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { TranscationDetailItem } from '../item/transcationDetailItem';

export const TranscationDetailModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');

  return (
    <BaseModal
      visible={visible}
      hideModal={hideModal}
    >
      <ScrollView style={{ width: '100%' }}>
        <MText>Transaction Details</MText>
        <TranscationDetailItem style={styles.marginV} />
        <TranscationDetailItem style={styles.marginV} />

        <MButton styles={{ width: '100%', marginVertical: 20 }} title={'View On Polygon'}></MButton>

        <MVStack stretchW style={styles.marginV}>
          <MText>Status</MText>
          <MText >Complete</MText>
          <Divider />

          <MText>Date & Time</MText>
          <MText>November 24, 2022 2:50:33 pm</MText>
          <Divider />

          <MText>Transaction Hash</MText>

          <MLineLR
            left={<MText>0x805b5aa7018dad01a082eff3d23c218d8fe473daca4b6d4d0021de1d652c652c</MText>}
            right={<MButton title={'copy'} />} />
          <Divider />

          <MLineLR left={<MText>Network</MText>} right={<MText>Polygon</MText>} />
        </MVStack>
      </ScrollView>

    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginTop: 20
  }
});