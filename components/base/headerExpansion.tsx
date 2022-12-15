import { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useQueryNetwork } from '../../lib/api/network';
import { loginOut, useAuth } from '../../lib/data/auth';
import { Screens } from '../../lib/define';
import CopyButton from '../baseUI/copyButton';
import MAnimView from '../baseUI/mAnimView';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { navigation } from './navigationInit';

export default function HeaderExpansion(props: { setIsFold: Dispatch<SetStateAction<boolean>> }) {
  const authData = useAuth();
  const [visible, setVisible] = useState(true);
  const [queryNetwork, network] = useQueryNetwork();

  const close = () => {
    setVisible(false);
  }

  return (
    <MAnimView hideFinishCb={() => props.setIsFold(true)} visible={visible} style={{
      borderRadius: 15,
      padding: 10,
      backgroundColor: 'rgba(200,200,200,0.6)',
    }}>
      <MHStack style={styles.bar} >
        <MImage style={styles.img} />
        <MVStack style={{ flex: 1 }}>
          <MText >{authData.blockchainAddress}</MText>
          <MHStack >
            <CopyButton style={{ 'margin': 5 }} copyText={authData.blockchainAddress} />
            {/* <MButton title='Receive' onPress={undefined} style={{ 'margin': 5 }}></MButton> */}
          </MHStack>
        </MVStack>
        <Pressable onPress={close}>
          <MImage size={12} style={{ marginLeft: 20 }} />
        </Pressable>
      </MHStack>

      <Pressable>
        <MVStack style={styles.email}>
          <MText>Google</MText>
          <MText>Wuyiming27094@gmail.com</MText>
        </MVStack>
      </Pressable>

      <Pressable>
        <MHStack style={styles.connected}>
          <MImage size={10} style={{ marginRight: 10 }} />
          <MVStack style={{ flex: 1 }}>
            <MText>Connected</MText>
            <MText>{network?.name}</MText>
          </MVStack>
          <MImage size={10} />
        </MHStack>
      </Pressable>

      <MHStack style={styles.button}>
        <MButton title='Settings' onPress={() => { close(); navigation.navigate(Screens.Setting); }} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}></MButton>
        <MButton title='Sign Out' onPress={() => loginOut()} style={{ 'margin': 5, 'flex': 1, 'height': 50 }}></MButton>
      </MHStack>

    </MAnimView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgba(200,200,200,1)',
  },
  bar: {
    flex: 1,
  },
  email: {
    flex: 1,
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 8
  },
  connected: {
    flex: 1,
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center'
  },
  button: {
    flex: 1,
  },
  img: {
    width: 48,
    height: 48
  },
});