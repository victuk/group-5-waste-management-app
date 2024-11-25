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
  <Stack screenOptions={{ headerShadowVisible: false }}>
    <Stack.Screen
      name="login"
      options={{ title: 'Amazon.sg',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
           <Text>Cancel</Text>
          </Pressable>
        )
       }}
    />
  </Stack>
    );
};

export default _layout;