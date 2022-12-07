
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  CoinScreen, ConnectScreen, DepositScreen,
  HistoryScreen,
  LoginScreen, ProfileScreen, SendScreen, SessionScreen, SettingScreen, WalletScreen
} from '../components/screen';
import { useAuth } from '../lib/data/auth';
import { Screens } from '../lib/define';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function App() {
  const authData = useAuth();
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>

            {/* screenOptions={{ headerShown: Platform.OS != 'web' }} */}
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}  >
              {
                authData.isLogin ? (
                  <>
                    <Stack.Screen name={Screens.Wallet} component={WalletScreen} />
                    <Stack.Screen name={Screens.Setting} component={SettingScreen} />
                    <Stack.Screen name={Screens.Profile} component={ProfileScreen} />
                    <Stack.Screen name={Screens.Session} component={SessionScreen} />
                    <Stack.Screen name={Screens.History} component={HistoryScreen} />
                    <Stack.Screen name={Screens.Coin} component={CoinScreen} />
                    <Stack.Screen name={Screens.Send} component={SendScreen} />
                    <Stack.Screen name={Screens.Deposit} component={DepositScreen} />
                    <Stack.Screen name={Screens.Connect} component={ConnectScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name={Screens.Login} component={LoginScreen} />
                  </>
                )
              }
            </Stack.Navigator>
          </QueryClientProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}