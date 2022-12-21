
import { StyleSheet, ViewProps } from 'react-native';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import { TermsOfUseModalItem } from '../modal/modalItem/informationModalItem';
import { showUpdateComModal } from './modalInit';

export default function Information(props: ViewProps) {
  const { style, ...rest } = props;
  return (
    <MVStack stretchW style={[styles.container, style]} {...rest}>

      <MHStack stretchW style={styles.list}>
        <MenuButton pointerEvents='auto' title='Terms Of Use' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
        <MenuButton pointerEvents='auto' title='Privacy Policy' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
        <MenuButton pointerEvents='auto' title='Support' onPress={() => showUpdateComModal(true, { 'height': Number.MAX_SAFE_INTEGER, 'reactNode': <TermsOfUseModalItem /> })} />
      </MHStack>
    </MVStack>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  list: {
    justifyContent: 'space-around',
  }
});
