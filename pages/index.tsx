
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BarUI } from '../components/base/barUI';
import ModalInit from '../components/base/modalInit';
import NavigationInit from '../components/base/navigationInit';
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
  SetupAuthScreen
} from '../components/screen';
import { Screens } from '../lib/define';
import { useListenerDimensionSize } from '../lib/hook/dimension';
import { WindowMessageHandler } from '@0xsodium/provider';
import { asyncSession, initHandler } from '../lib/provider';
import { useEffect } from 'react';

const queryClient = new QueryClient(
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
    wmh.register(location.href).then(() => {
      asyncSession()
    });
  }, [1])

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <ModalInit />
            <NavigationInit />
            <BarUI />

            {/* screenOptions={{ headerShown: Platform.OS != 'web' }} */}
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}  >
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