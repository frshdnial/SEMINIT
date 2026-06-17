import React from 'react';
import { View } from 'react-native';

import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateToSetup: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onNavigateToSetup,
}) => {
  return (
    <View className="flex-1 flex-col md:flex-row bg-[#F8FAFC]">
      <Sidebar
        onNavigateToSetup={onNavigateToSetup}
      />

      {children}
    </View>
  );
};