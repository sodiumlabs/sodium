
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BarUI } from '../components/base/barUI';
import ModalInit from '../components/base/modalInit';
import NavigationInit, { isNavigationReadyAtom, navigationRef } from '../components/base/navigationInit';
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
import { WindowMessageHandler, IframeMessageHandler } from '@0xsodium/provider';
import { asyncSession, initHandler } from '../lib/provider';
import { useEffect } from 'react';
import { showUpdateComModal } from '../components/base/modalInit';
import { FailModalItem } from '../components/modal/modalItem/failModalItem';

const queryClient = new QueryClient(
  {
    queryCache: new QueryCache({
      onError: (error: Error) => {
        // toastError(error.message);
        console.log(error.message);
        showUpdateComModal(true, { 'height': 300, 'reactNode': <FailModalItem error={error.message} /> });
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

  useEffect(() => {
    const handler = initHandler();
    const wmh = new WindowMessageHandler(handler);
    const imh = new IframeMessageHandler(handler);

    const regp1 = imh.register(location.href);
    const regp2 = wmh.register(location.href);
    Promise.all([
      regp1,
      regp2
    ]).then(() => {
      asyncSession()
    })
  }, [1])

  return (
    <SafeAreaProvider>
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
            </Stack.Navigator>

          </NavigationContainer>
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}