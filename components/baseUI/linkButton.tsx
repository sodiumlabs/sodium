


import { useState } from 'react';
import { Linking, Pressable, PressableProps, StyleSheet } from 'react-native';
import { getAddressExplorer } from '../../lib/common/network';
import { IUserTokenInfo } from '../../lib/define';
import MHStack from './mHStack';
import MText from './mText';

export default function LinkButton(props: PressableProps & { tokenInfo: IUserTokenInfo }) {
  const { tokenInfo, style, ...rest } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  const linkTxHash = () => {
    Linking.openURL(getAddressExplorer(tokenInfo.token.chainId, tokenInfo.token.address))
  }

  return (
    <Pressable
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      style={[styles.button, style as unknown, { opacity: isItemHovered ? 1 : 0.8 }]} onPress={linkTxHash} {...rest}>
      <MHStack style={{ justifyContent: 'center', alignItems: 'center' }} >
        {/* <MImage h={10} w={10} style={{ marginRight: 5 }} source={IconCopy} /> */}
        <MText > Link </MText>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: "#EDF2F5",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  }
})
