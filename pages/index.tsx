import * as eva from '@eva-design/eva';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import * as SplashScreen from 'expo-splash-screen';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BarUI } from '../components/base/barUI';
import ModalInit from '../components/base/modalInit';
import { isNavigationReadyAtom, navigationRef } from '../components/base/navigation';
import NavigationInit from '../components/base/navigationInit';
import { showErrorModal } from '../lib/data/modal';
import { listen } from '../lib/subscriber';

import {
  IframeMessageHandler,
  ProxyMessageHandler,
  WindowMessageHandler,
} from '@0xsodium/provider';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BaseUIInit } from '../components/base/baseUIInit';
import ScaleInit from '../components/base/scaleInit';
import {
  AllowanceScreen,
  CoinScreen,
  DepositScreen,
  HistoryScreen,
  LoginScreen,
  OpeningScreen,
  ProfileScreen,
  RecoveryCodeScreen,
  SecurityScreen,
  SendScreen,
  SessionScreen,
  SettingScreen,
  SetupAuthScreen,
  WalletScreen
} from '../components/screen';
import { AppsScreen } from '../components/screen/appsScreen';
import { AuthCallbackScreen } from '../components/screen/authCallbackScreen';
import { initProjectSetting } from '../lib/data/project';
import { updateCurScreenTab } from '../lib/data/screen';
import { Screens } from '../lib/define';
import { useListenerDimensionSize } from '../lib/hook/dimension';
import { asyncSession, initHandler, proxyChannel } from '../lib/provider';
import { EventInit } from '../components/base/eventInit';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        cacheTime: 0,
        refetchOnWindowFocus: true
      }
    },
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
const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


listen();

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

    }).then(() => {
      if (Platform.OS != "web") {
        SplashScreen.hideAsync();
      }
    })
  }, [1])

  function handleStateChange(state): void {
    const routeState = state.routes[0].state;
    const routes = routeState.routes;
    const index = routeState.index;
    updateCurScreenTab(routes[index].name);
  }

  return (
    <SafeAreaProvider>
      <EventInit />
      <BaseUIInit />
      <ScaleInit />
      <StatusBar style="dark" backgroundColor='#F7F7F7' />
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef} onReady={() => isNavigationReadyAtom.set(true)} onStateChange={handleStateChange}>
            <ModalInit />
            <NavigationInit />
            <BarUI />
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { display: 'none' } }}   >
              <Tab.Screen name="Home" >
                {() => (
                  <SettingsStack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}  >
                    <SettingsStack.Screen name={Screens.Opening} component={OpeningScreen} />
                    <SettingsStack.Screen name={Screens.Login} component={LoginScreen} />
                    <SettingsStack.Screen name={Screens.Wallet} component={WalletScreen} />
                    <SettingsStack.Screen name={Screens.Setting} component={SettingScreen} />
                    <SettingsStack.Screen name={Screens.Profile} component={ProfileScreen} />
                    <SettingsStack.Screen name={Screens.Apps} component={AppsScreen} />
                    <SettingsStack.Screen name={Screens.Session} component={SessionScreen} />
                    <SettingsStack.Screen name={Screens.History} component={HistoryScreen} />
                    <SettingsStack.Screen name={Screens.Coin} component={CoinScreen} />
                    <SettingsStack.Screen name={Screens.Send} component={SendScreen} />
                    <SettingsStack.Screen name={Screens.Deposit} component={DepositScreen} />
                    <SettingsStack.Screen name={Screens.Security} component={SecurityScreen} />
                    <SettingsStack.Screen name={Screens.SetupAuth} component={SetupAuthScreen} />
                    <SettingsStack.Screen name={Screens.RecoveryCode} component={RecoveryCodeScreen} />
                    <SettingsStack.Screen name={Screens.Allowance} component={AllowanceScreen} />
                    <SettingsStack.Screen name={Screens.AuthCallbackScreen} component={AuthCallbackScreen} />
                  </SettingsStack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>

          </NavigationContainer>
        </QueryClientProvider>
      </ApplicationProvider>
    </SafeAreaProvider >
  );
}