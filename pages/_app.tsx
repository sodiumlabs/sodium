import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useFonts } from 'expo-font';

export default function App({ Component, pageProps }: AppProps) {

  // const [fontsLoaded] = useFonts({
  //   'Roboto': require('./../assets/fonts/Roboto.ttf'),
  // });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}