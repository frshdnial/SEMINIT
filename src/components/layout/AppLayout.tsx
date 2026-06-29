import React from 'react';
import { View } from 'react-native';

import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateToSetup: () => void;
  onNavigateToList: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onNavigateToSetup,
  onNavigateToList,
}) => {
  return (
    <View className="flex-1 flex-col md:flex-row bg-[#F8FAFC]">
      <Sidebar
        onNavigateToSetup={onNavigateToSetup}
        onNavigateToList={onNavigateToList}
      />

      {/* This is the missing piece */}
      <View className="flex-1 w-full">
        {children}
      </View>
    </View>
  );
};