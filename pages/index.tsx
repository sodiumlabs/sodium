
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalInit from '../components/base/modalInit';
import NavigationInit from '../components/base/navigationInit';
import {
  CoinScreen, ConnectScreen, DepositScreen,
  HistoryScreen,
  LoginScreen, ProfileScreen, SendScreen, SessionScreen, SettingScreen, WalletScreen
} from '../components/screen';
import { RecoveryCodeScreen } from '../components/screen/ recoveryCodeScreen';
import { SecurityScreen } from '../components/screen/securityScreen';
import { SetupAuthScreen } from '../components/screen/setupAuthScreen';
import { Screens } from '../lib/define';
import { useListenerDimensionSize } from '../lib/hook/dimension';

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
  // const authData = useAuth();
  useListenerDimensionSize();
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>

            <ModalInit />
            <NavigationInit />
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
            </Stack.Navigator>

          </NavigationContainer>
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}