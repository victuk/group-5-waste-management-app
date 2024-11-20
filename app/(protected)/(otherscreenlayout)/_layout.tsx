import { View, Text, StatusBar, Pressable } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { CartIcon } from '@/components/CartCOmponents/CartIcon';

export default function OtherScreenLayout() {

    const router = useRouter();

    const onPress = () => {
        if (router.canGoBack()) {
          router.back();
        }
      };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
            title: "Product Details",
            headerRight: () => <CartIcon />,
            headerLeft: () => (
                <Pressable
                  onPress={onPress}
                  style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 5 })}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
            ),
        }}
        />
    </>
  )
}