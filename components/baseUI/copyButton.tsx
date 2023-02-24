

import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { PressableProps, StyleSheet } from 'react-native';
import { waitTime } from '../../lib/common/common';
import { IconCopy } from '../../lib/imageDefine';
import MHStack from './mHStack';
import MImage from './mImage';
import MPressable from './mPressable';
import MText from './mText';

export default function CopyButton(props: PressableProps & { copyText: string }) {
  const { copyText, style, ...rest } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [isItemHovered, setIsItemHovered] = useState(false);

  const copyClick = async () => {
    if (isCopied) return;
    setIsCopied(true);
    Clipboard.setStringAsync(copyText);

    await waitTime(5000);
    setIsCopied(false);
  }

  return (
    <MPressable

      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      style={[styles.button, style as unknown, { opacity: isItemHovered ? 1 : 0.8 }]} onPress={copyClick} {...rest}>
      <MHStack style={{ justifyContent: 'center', alignItems: 'center' }} >
        <MImage h={10} w={10} style={{ marginRight: 5 }} source={IconCopy} />
        <MText > {isCopied ? "Copied" : "Copy"} </MText>
      </MHStack>
    </MPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    // width: 70,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: "#EDF2F5",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  }
})
