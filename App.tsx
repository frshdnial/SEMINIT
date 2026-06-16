import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import "./global.css"; // 👈 CRITICAL: Imports global styles for NativeWind v4 Web/Mobile engines

// Cleaned up to use your configured path aliases
import { AudioUploadScreen } from '@/screens/AudioUploadScreen';
import { CreateMeetingScreen } from '@/screens/CreateMeetingScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { ViewMinutesScreen } from '@/screens/ViewMinutesScreen';
import { Meeting } from '@/types';

type ScreenState = 'DASHBOARD' | 'CREATE' | 'UPLOAD' | 'MINUTES';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('DASHBOARD');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeSelectedMeeting, setActiveSelectedMeeting] = useState<Meeting | null>(null);

  const handleCreateMeetingComplete = (newMeeting: Meeting) => {
    setMeetings([newMeeting, ...meetings]);
    setActiveSelectedMeeting(newMeeting);
    setCurrentScreen('UPLOAD');
  };

  const handleAudioProcessingComplete = (id: string, transcript: string, summary: string) => {
    const modifications = meetings.map((item: Meeting) => {
      if (item.id === id) {
        return { ...item, status: 'Completed' as const, transcript, summary };
      }
      return item;
    });
    
    setMeetings(modifications);
    const targetElement = modifications.find((item: Meeting) => item.id === id);
    if (targetElement) {
      setActiveSelectedMeeting(targetElement);
    }
    setCurrentScreen('MINUTES');
  };

  const handleSelectMeetingEntry = (meeting: Meeting) => {
    setActiveSelectedMeeting(meeting);
    if (meeting.status === 'Completed') {
      setCurrentScreen('MINUTES');
    } else {
      setCurrentScreen('UPLOAD');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {currentScreen === 'DASHBOARD' && (
        <DashboardScreen 
          meetings={meetings}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
          onSelectMeeting={handleSelectMeetingEntry}
        />
      )}

      {currentScreen === 'CREATE' && (
        <CreateMeetingScreen 
          onSaveMeeting={handleCreateMeetingComplete}
          onBack={() => setCurrentScreen('DASHBOARD')}
        />
      )}

      {currentScreen === 'UPLOAD' && activeSelectedMeeting && (
        <AudioUploadScreen 
          meeting={activeSelectedMeeting}
          onAudioProcessed={handleAudioProcessingComplete}
          onBack={() => setCurrentScreen('DASHBOARD')}
        />
      )}

      {currentScreen === 'MINUTES' && activeSelectedMeeting && (
        <ViewMinutesScreen 
          meeting={activeSelectedMeeting}
          onBack={() => setCurrentScreen('DASHBOARD')}
        />
      )}
    </View>
  );
}