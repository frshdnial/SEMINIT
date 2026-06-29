import React from 'react';
import { View, ScrollView } from 'react-native';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateToSetup?: () => void;
  onNavigateToList?: () => void;
  onNavigateToDashboard?: () => void; // Included to protect dashboard/home navigation clicks
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onNavigateToSetup = () => {},
  onNavigateToList = () => {},
  onNavigateToDashboard = () => {},
}) => {
  return (
    <View className="flex-1 flex-col md:flex-row bg-[#F8FAFC] h-full">
      {/* Sidebar stays full height */}
      <View className="h-full">
        <Sidebar
          onNavigateToSetup={onNavigateToSetup}
          onNavigateToList={onNavigateToList}
          // Note: SidebarProps does not include onNavigateToDashboard, so we avoid passing it to prevent TS error.
        />
      </View>

      {/* Content area */}
      <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};