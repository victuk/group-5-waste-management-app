import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";
import NetworkBanner from "@/components/NotConnectedBanner";
import { ToastAndroid } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const netInfo = useNetInfo();

  const isConnected = netInfo.isInternetReachable;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isConnected) {
      ToastAndroid.show("Connected", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Disconnected", ToastAndroid.SHORT);
    }
  }, [isConnected]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
          {!isConnected && <NetworkBanner />}
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
}
