import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useUserStore } from '@/store/authStore';

export default function ProtectedLayout() {

    const user = useUserStore((state) => state.user);

    const isOnboarded = useUserStore((state) => state.isOnboarded);

    if(!isOnboarded) {
      return <Redirect href={"/onboardscreen"} />
    }

    // if(!user?.token) {
    //     return <Redirect href={"/login"} />
    // }

  return (
    <Stack screenOptions={{
        headerShown: false
    }} />
  )
}