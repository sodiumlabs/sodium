
import { createRef, Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useLoginData } from '../../src/data/login';
import MText from '../baseUI/mText';
import MHStack from '../baseUI/mHStack';
import { useNavigation } from '@react-navigation/native';
import MAnimView from '../baseUI/mAnimView';

export default function HeaderFold(props: { setIsFold: Dispatch<SetStateAction<boolean>>, isBack?: boolean }) {
  const loginData = useLoginData();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  return (
    <MAnimView hideFinishCb={() => props.setIsFold(false)} visible={visible} >
      <MHStack stretchW style={styles.container}>
        {
          props.isBack && (
            <Pressable style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
              <Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />
            </Pressable>
          )
        }
        <Pressable style={{ flexDirection: 'row', flex: 1 }} onPress={() => setVisible(false)} >
          <Image style={styles.img} source={require('./../../assets/favicon.png')} />
          <MText style={{ flex: 1 }} >{loginData.blockchainAddress}</MText>
          <Image style={styles.expand} source={require('./../../assets/favicon.png')} />
        </Pressable>
      </MHStack>
    </MAnimView>
  );
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(200,200,200,1)',
    alignItems: 'center',
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