
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HistoryScreen } from '../components/screen/historyScreen';
import { LoginScreen } from '../components/screen/loginScreen';
import { WalletScreen } from '../components/screen/walletScreen';
import { fetchLoginData, useLoginData } from '../src/data/login';
import { CoinScreen } from '../components/screen/coinScreen';
import { SendScreen } from '../components/screen/sendScreen';
import { UIManager } from 'react-native';
import { SettingScreen } from '../components/screen/settingScreen';
import { ProfileScreen } from '../components/screen/profileScreen';
import { SessionScreen } from '../components/screen/sessionScreen';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function App() {

  useEffect(() => {
    fetchLoginData();
    console.log(Platform.OS);
  }, []);

  const loginData = useLoginData();

  return (
    <ApplicationProvider {...eva} theme={eva.light}>

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

