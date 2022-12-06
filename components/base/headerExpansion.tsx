import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { loginOut, useAuth } from '../../lib/data/auth';
import MAnimView from '../baseUI/mAnimView';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { useNavigation } from '../../lib/navigation';

export default function HeaderExpansion(props: { setIsFold: Dispatch<SetStateAction<boolean>> }) {
  const authData = useAuth();
  const navigation = useNavigation();

  if (!authData.isLogin) {
    // TODO 这里应该跳转到登录页
    return
  }

  const [visible, setVisible] = useState(true);

  const close = () => {
    setVisible(false);
  }

  return (
    <MAnimView hideFinishCb={() => props.setIsFold(true)} visible={visible} style={{
      borderRadius: 15,
      padding: 10,
      backgroundColor: 'rgba(200,200,200,1)',
    }}>
      <MHStack style={styles.bar} >
        <MImage style={styles.img} />
        <MVStack style={{ flex: 1 }}>
          <MText >{authData.blockchainAddress}</MText>
          <MHStack >
            <MButton title='Copy' onPress={undefined} styles={{ 'margin': 5 }}></MButton>
            <MButton title='Receive' onPress={undefined} styles={{ 'margin': 5 }}></MButton>
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
            <MText>Ethereum</MText>
          </MVStack>
          <MImage size={10} />
        </MHStack>
      </Pressable>

      <MHStack style={styles.button}>
        <MButton title='Settings' onPress={() => { close(); navigation.navigate('Setting'); }} styles={{ 'margin': 5, 'flex': 1, 'height': 50 }}></MButton>
        <MButton title='Sign Out' onPress={() => loginOut()} styles={{ 'margin': 5, 'flex': 1, 'height': 50 }}></MButton>
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
    backgroundColor: '#fff',
    borderRadius: 8
  },
  connected: {
    flex: 1,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
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