import { useState, useEffect, useCallback } from 'react';

import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';

const clipboardAtom = atom<string>('');
export function useMClipboard(): [string, (text: string) => void] {
  // const [copiedText, setCopiedText] = React.useState('');
  const copiedText = useStore(clipboardAtom);
  const copyToClipboard = (text: string) => {
    (async () => {
      await Clipboard.setStringAsync(text);
      clipboardAtom.set(text);
    })()
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  // };

  useEffect(() => {
    (async () => {
      try {
        const text = await Clipboard.getStringAsync();
        clipboardAtom.set(text);
      } catch (e) {
        console.error(e);
      }
    })()
  }, [])


  return [copiedText, copyToClipboard];
}
