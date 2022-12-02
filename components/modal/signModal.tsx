import { ScrollView, StyleSheet, Image } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import MLineLR from '../baseUI/mLineLR';
import { Divider } from '@ui-kitten/components';
import { BaseFoldFrame } from '../base/baseFoldFrame';

export const SignModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');

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
            <MVStack stretchW>
              <MLineLR
                left={
                  <>
                    <MText >Network</MText>
                    <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
                  </>}
                right={<MText >PLOYGON</MText>}
              />
              <MLineLR
                left={<MText >Requested at</MText>}
                right={<MText>December 1, 2022 8:17:14 pm</MText>}
              />
            </MVStack>

            <BaseFoldFrame
              header={<MText >Transfer(1/1)</MText>}>

              <MText>Send</MText>
              <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
                <MText style={{ flex: 1 }}>Polygon(Matic)</MText>
                <MText >1.46666 MATIC</MText>
              </MHStack>

              <Divider />
              <MText>To Recipient</MText>
              <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
                <MText style={{ flex: 1 }}>0x95bF59b7C60aFfc6fe29E6D1db852Be408f3d085</MText>
              </MHStack>

            </BaseFoldFrame>

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