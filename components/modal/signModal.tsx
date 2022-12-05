import { ScrollView, StyleSheet, Image, Pressable, Text } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import MLineLR from '../baseUI/mLineLR';
import { Divider } from '@ui-kitten/components';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { showTranscationQueueModal, showSignModal } from '../base/screenInit';
import CoinItem from '../item/coinItem';
import NetworkFeeItem from '../item/networkFeeItem';
import MImage from '../baseUI/mImage';

export const SignModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');
  const onClickTranscationQueue = () => {
    showSignModal(false);
    showTranscationQueueModal(true);
  }

  return (
    <BaseModal
      visible={visible}
      hideModal={hideModal}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView >
            <MHStack stretchW style={{ justifyContent: 'center' }}>
              <MText>Sign Transaction </MText>
            </MHStack>
            <Pressable onPress={onClickTranscationQueue}>
              <MText>Transcation Queue</MText>
            </Pressable>

            <MVStack stretchW>
              <MLineLR
                left={
                  <>
                    <MText >Network</MText>
                    <MImage size={20} />
                  </>}
                right={<MText >PLOYGON</MText>} />
              <MLineLR
                left={<MText >Requested at</MText>}
                right={<MText>December 1, 2022 8:17:14 pm</MText>} />
            </MVStack>

            <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
              header={<MText >Transfer(1/1)</MText>}>

              <MText>Send</MText>
              <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                <MImage size={20} />
                <MText style={{ flex: 1 }}>Polygon(Matic)</MText>
                <MText >1.46666 MATIC</MText>
              </MHStack>

              <Divider />
              <MText>To Recipient</MText>
              <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                <MImage size={20} />
                <MText style={{ flex: 1 }}>0x95bF59b7C60aFfc6fe29E6D1db852Be408f3d085</MText>
              </MHStack>
            </BaseFoldFrame>

            <BaseFoldFrame header={<MText>Transcation Data(1)</MText>} style={{ marginTop: 20 }}>
              <MVStack stretchW style={{ backgroundColor: '#999', borderRadius: 15 }}>
                <Text>
                  {
                    `{
                      "to": "0x95bF59b7C60aFfc6fe29E6D1db852Be408f3d085",
                      "signature": "",
                      "byteSignature": "0x",
                      "methodName": "",
                      "args": {},
                      "objs": [],
                      "value": "100000000000000000",
                      "data": "0x"
                  }`
                  }
                </Text>
              </MVStack>
            </BaseFoldFrame>

            <MVStack>
              <MHStack stretchW style={{ alignItems: 'center' }}>
                <MText>Network Fee</MText>
                <MHStack style={{ borderRadius: 999, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }}>
                  <MImage size={10} />
                </MHStack>
              </MHStack>

              <NetworkFeeItem />
              <NetworkFeeItem />

            </MVStack>

          </ScrollView>
        </MVStack>

      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});