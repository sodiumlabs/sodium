
import { StyleSheet, ViewProps } from 'react-native';
import { Screens } from '../../lib/define';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import { navigation } from './navigationInit';

export default function Information(props: ViewProps) {
  const { style, ...rest } = props;
  return (
    <MVStack stretchW style={[styles.container, style]} {...rest}>

      <MHStack stretchW style={styles.list}>
        <MenuButton pointerEvents='auto' title='Terms Of Use' onPress={() => navigation.navigate(Screens.Connect)} />
        <MenuButton pointerEvents='auto' title='Privacy Policy' onPress={() => navigation.navigate(Screens.RecoveryCode)} />
        <MenuButton pointerEvents='auto' title='Support' onPress={() => navigation.navigate(Screens.SetupAuth)} />
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
