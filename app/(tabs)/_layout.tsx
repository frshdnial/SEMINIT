import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#800020',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: { backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#e5e7eb' },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Dashboard',
          headerTitle: 'Seminit Dashboard'
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Search & History',
          headerTitle: 'Search Database'
        }} 
      />
    </Tabs>
  );
}