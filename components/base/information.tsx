
import { StyleSheet, ViewProps } from 'react-native';
import { IconInfoTerm, IconInfoPolicy, IconInfoSupport } from '../../lib/imageDefine';
import InfomationButton from '../baseUI/infomationButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import { TermsOfUseModalItem } from '../modal/modalItem/informationModalItem';
import { showUpdateComModal } from './modalInit';

export default function Information(props: ViewProps) {
  const { style, ...rest } = props;
  return (
    <MVStack stretchW style={[styles.container, style]} {...rest}>

      <MHStack stretchW style={styles.list}>
        <InfomationButton source={IconInfoTerm} pointerEvents='auto' title='Terms Of Use' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
        <InfomationButton source={IconInfoPolicy} pointerEvents='auto' title='Privacy Policy' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
        <InfomationButton source={IconInfoSupport} pointerEvents='auto' title='Support' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
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
