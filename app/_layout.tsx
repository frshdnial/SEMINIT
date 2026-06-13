import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1D3557', // Dark Royal Blue
          },
          headerTintColor: '#D4AF37',   // Gold Titles
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="meeting-setup" options={{ title: 'New Meeting Setup', presentation: 'modal' }} />
      </Stack>
    </>
  );
}