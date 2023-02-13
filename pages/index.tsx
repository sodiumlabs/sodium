import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BarUI } from '../components/base/barUI';
import ModalInit from '../components/base/modalInit';
import { showErrorModal } from '../lib/data/modal';
import { isNavigationReadyAtom, navigationRef } from '../components/base/navigation';
import NavigationInit from '../components/base/navigationInit';
import * as SplashScreen from 'expo-splash-screen';
import {
  CoinScreen,
  ConnectScreen,
  DepositScreen,
  HistoryScreen,
  LoginScreen,
  ProfileScreen,
  SendScreen,
  SessionScreen,
  SettingScreen,
  WalletScreen,
  AllowanceScreen,
  RecoveryCodeScreen,
  SecurityScreen,
  SetupAuthScreen,
  OpeningScreen
} from '../components/screen';
import { Screens } from '../lib/define';
import { useListenerDimensionSize } from '../lib/hook/dimension';
import { 
  WindowMessageHandler, 
  IframeMessageHandler,
  ProxyMessageHandler,
} from '@0xsodium/provider';
import { asyncSession, initHandler, proxyChannel } from '../lib/provider';
import { useEffect } from 'react';
import { initProjectSetting } from '../lib/data/project';
import { AuthCallbackScreen } from '../components/screen/authCallbackScreen';
import { StatusBar } from 'expo-status-bar';
import { authAtom } from '../lib/data/authAtom';
import { init as initWalletConnect } from '../lib/walletconnect';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient(
  {
    queryCache: new QueryCache({
      onError: (error: Error) => {
        showErrorModal(error.message);
      }
    }),
  }
  // {
  //   'defaultOptions': {
  //     'queries': {
  //       'cacheTime': 0,
  //       'refetchInterval': 0,
  //       'refetchOnWindowFocus': false
  //     }
  //   }
  // }
);
const Stack = createNativeStackNavigator();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function App() {
  useListenerDimensionSize();

  if (Platform.OS != "web") {
    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();
  }

  useEffect(() => {
    initProjectSetting();
    const initPromises = [];
    const handler = initHandler();
    const proxymh = new ProxyMessageHandler(handler, proxyChannel.wallet)
    initPromises.push(proxymh.register());
    if (Platform.OS == "web") {
      const wmh = new WindowMessageHandler(handler);
      const imh = new IframeMessageHandler(handler);
      const regp1 = imh.register(location.href);
      const regp2 = wmh.register(location.href);
      initPromises.push(regp1, regp2);
    } else {
      initPromises.push(Promise.resolve());
    }
    Promise.all(initPromises).then(() => {
      return asyncSession()
    }).then(() => {
      if (Platform.OS != "web") {
        SplashScreen.hideAsync();
        console.debug("close splash screen");
      }

      const auth = authAtom.get();
      if (auth.isLogin) {
        initWalletConnect();
      } else {
        // if no auth.
        // clear old data.
        AsyncStorage.clear();
      }
    })
  }, [1])

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor='#F7F7F7' />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef} onReady={() => isNavigationReadyAtom.set(true)}>
            <ModalInit />
            <NavigationInit />
            <BarUI />
            {/* screenOptions={{ headerShown: Platform.OS != 'web' }} */}
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}  >
              <Stack.Screen name={Screens.Opening} component={OpeningScreen} />
              <Stack.Screen name={Screens.Login} component={LoginScreen} />
              <Stack.Screen name={Screens.Wallet} component={WalletScreen} />
              <Stack.Screen name={Screens.Setting} component={SettingScreen} />
              <Stack.Screen name={Screens.Profile} component={ProfileScreen} />
              <Stack.Screen name={Screens.Session} component={SessionScreen} />
              <Stack.Screen name={Screens.History} component={HistoryScreen} />
              <Stack.Screen name={Screens.Coin} component={CoinScreen} />
              <Stack.Screen name={Screens.Send} component={SendScreen} />
              <Stack.Screen name={Screens.Deposit} component={DepositScreen} />
              <Stack.Screen name={Screens.Connect} component={ConnectScreen} />
              <Stack.Screen name={Screens.Security} component={SecurityScreen} />
              <Stack.Screen name={Screens.SetupAuth} component={SetupAuthScreen} />
              <Stack.Screen name={Screens.RecoveryCode} component={RecoveryCodeScreen} />
              <Stack.Screen name={Screens.Allowance} component={AllowanceScreen} />
              <Stack.Screen name={Screens.AuthCallbackScreen} component={AuthCallbackScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}