import { useClipboard } from '@react-native-community/clipboard';
import { useState } from 'react';
import { Platform } from 'react-native';

export function useMClipboard() {
  if (Platform.OS === 'web') {
    return useWebClipboard();
  } else {
    return useNativeClipboard();
  }
}

function useNativeClipboard(): [string, (content: string) => void] {
  const [clipboardContent, setClipboardContent] = useClipboard();

  return [clipboardContent, setClipboardContent];
}

function useWebClipboard(): [string, (content: string) => void] {
  const [clipboardContent, setClipboardContent] = useState();

  // useEffect(() => {
  //   async function updateClipboard() {
  //     setClipboardContent(await navigator.clipboard.readText());
  //   }

  //   navigator.clipboard.addEventListener('clipboardchange', updateClipboard);

  //   return () => {
  //     navigator.clipboard.removeEventListener(
  //       'clipboardchange',
  //       updateClipboard
  //     );
  //   };
  // }, []);

  function setMClipboardContent(text) {
    navigator.clipboard.writeText(text);
    setClipboardContent(text);
  }

  return [clipboardContent, setMClipboardContent];
}
