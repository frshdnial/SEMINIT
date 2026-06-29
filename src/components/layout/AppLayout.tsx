import React from 'react';
import { View, ScrollView } from 'react-native';
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
    <View className="flex-1 flex-col md:flex-row bg-[#F8FAFC] h-full">
      {/* Sidebar should stretch full height */}
      <View className="h-full">
        <Sidebar
          onNavigateToSetup={onNavigateToSetup}
          onNavigateToList={onNavigateToList}
        />
      </View>

      {/* Content area should scroll */}
      <ScrollView className="flex-1 w-full">
        {children}
      </ScrollView>
    </View>
  );
};
