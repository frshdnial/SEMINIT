import React from 'react';
import { View, ScrollView } from 'react-native';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  activeRoute: 'Dashboard' | 'MeetingList' | 'CreateMeeting'; // 👈 hardcoded per screen
  onNavigateToSetup?: () => void;
  onNavigateToList?: () => void;
  onNavigateToDashboard?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeRoute,
  onNavigateToSetup = () => {},
  onNavigateToList = () => {},
  onNavigateToDashboard = () => {},
}) => {
  return (
    <View className="flex-1 flex-col md:flex-row bg-[#F8FAFC] h-full">
      {/* Sidebar stays full height */}
      <View className="h-full">
        <Sidebar
          activeRoute={activeRoute} // 👈 pass down
          onNavigateToSetup={onNavigateToSetup}
          onNavigateToList={onNavigateToList}
          onNavigateToDashboard={onNavigateToDashboard}
        />
      </View>

      {/* Content area */}
      <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};
