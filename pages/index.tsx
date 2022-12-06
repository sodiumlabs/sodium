
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { Platform, UIManager } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Init } from '../components/base/init';
import { CoinScreen } from '../components/screen/coinScreen';
import { DepositScreen } from '../components/screen/depositScreen';
import { HistoryScreen } from '../components/screen/historyScreen';
import { LoginScreen } from '../components/screen/loginScreen';
import { ProfileScreen } from '../components/screen/profileScreen';
import { SendScreen } from '../components/screen/sendScreen';
import { SessionScreen } from '../components/screen/sessionScreen';
import { SettingScreen } from '../components/screen/settingScreen';
import { WalletScreen } from '../components/screen/walletScreen';
import { useLoginData } from '../src/data/login';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function App() {

  const loginData = useLoginData();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Init />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {/* screenOptions={{ headerShown: Platform.OS != 'web' }} */}
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}  >
            {
              loginData.isLogin ? (
                <>
                  <Stack.Screen name="Wallet" component={WalletScreen} />
                  <Stack.Screen name="Setting" component={SettingScreen} />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Session" component={SessionScreen} />
                  <Stack.Screen name="History" component={HistoryScreen} />
                  <Stack.Screen name="Coin" component={CoinScreen} />
                  <Stack.Screen name="Send" component={SendScreen} />
                  <Stack.Screen name="Deposit" component={DepositScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                </>
              )
            }

          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

