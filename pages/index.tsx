
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HistoryScreen } from '../components/screen/historyScreen';
import { WalletScreen } from '../components/screen/walletScreen';
import { fetchLoginData } from '../src/data/login';


const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    fetchLoginData();
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        {/* screenOptions={{ headerShown: false }} */}
        <Stack.Navigator >
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

