import { useUserStore } from "@/store/authStore";
import { Redirect, router, Stack } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

const _layout = () => {

  const user = useUserStore((state) => state.user);

    if(user?.token) {
        return <Redirect href={"/"} />
    }

  const onPress = () => {
    router.back();
  }
    return (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login" />
    <Stack.Screen name="register" />
    <Stack.Screen name="onboardscreen" />
  </Stack>
    );
};

export default _layout;