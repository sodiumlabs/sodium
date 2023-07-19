
import { StyleSheet, ViewProps } from 'react-native';
import { IconInfoPolicy } from '../../lib/imageDefine';
import InfomationButton from '../baseUI/infomationButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import { TermsOfUseModalItem } from '../modal/modalItem/termsOfUseModalItem';
import { showUpdateComModal } from '../../lib/data/modal';
import { PrivacyPolicyModalItem } from '../modal/modalItem/policyModalItem';
import { SupportModalItem } from '../modal/modalItem/supportModalItem';

export default function Information(props: ViewProps) {
  const { style, ...rest } = props;
  return (
    <MVStack stretchW style={[styles.container, style]} {...rest}>

      <MHStack stretchW style={styles.list}>
        <InfomationButton pointerEvents='auto' title='Terms Of Use' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
        <InfomationButton source={IconInfoPolicy} pointerEvents='auto' title='Privacy Policy' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <PrivacyPolicyModalItem /> })} />
        <InfomationButton pointerEvents='auto' title='Support' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <SupportModalItem /> })} />
      </MHStack>
    </MVStack>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  list: {
    justifyContent: 'space-around',
  }
});
