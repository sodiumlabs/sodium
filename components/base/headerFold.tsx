
import { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useAuth } from '../../lib/data/auth';
import MAnimView from '../baseUI/mAnimView';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import { navigation } from './navigationInit';

export default function HeaderFold(props: { setIsFold: Dispatch<SetStateAction<boolean>>, isBack?: boolean }) {
  const authData = useAuth();
  const [visible, setVisible] = useState(true);

  return (
    <MAnimView hideFinishCb={() => props.setIsFold(false)} visible={visible} >
      <MHStack stretchW style={styles.container} pointerEvents='auto' >
        {
          props.isBack && (
            <Pressable style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
              <MImage size={10} />
            </Pressable>
          )
        }
        <Pressable style={{ flexDirection: 'row', flex: 1, paddingVertical: 10 }} onPress={() => setVisible(false)} >
          <MImage style={styles.img} />
          <MText style={{ flex: 1 }} >{authData.blockchainAddress}</MText>
          <MImage style={styles.expand} />
        </Pressable>
      </MHStack>
    </MAnimView>
  );
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(200,200,200,0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 24,
    height: 24
  },
  expand: {
    width: 24,
    height: 24,
    marginLeft: 20,
  }
});