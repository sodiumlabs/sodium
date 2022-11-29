
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HistoryScreen } from '../components/screen/historyScreen';
import { WalletScreen } from '../components/screen/walletScreen';
import { fetchLoginData } from '../src/data/login';
import * as eva from '@eva-design/eva';


const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    fetchLoginData();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>

      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator >{/* screenOptions={{ headerShown: false }} */}
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

