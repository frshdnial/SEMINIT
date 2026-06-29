import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';
import "./global.css"; // Imports global Tailwind utility engine configurations

import { AudioUploadScreen } from '@/screens/AudioUploadScreen';
import { CreateMeetingScreen } from '@/screens/CreateMeetingScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { GenerateMinutesScreen } from '@/screens/GenerateMinutesScreen';
import { MeetingListScreen } from '@/screens/MeetingListScreen';
import { ViewMinutesScreen } from '@/screens/ViewMinutesScreen';
import { Meeting } from '@/types';

type ScreenState = 'DASHBOARD' | 'CREATE' | 'UPLOAD' | 'GENERATE' | 'MINUTES' | 'LIST';

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
    // Package finalized prototype dataset fields cleanly
    const finalizedObject: Meeting = {
      id,
      name: activeSelectedMeeting?.name || 'Mesyuarat Seminit',
      location: activeSelectedMeeting?.location || 'Bilik Mesyuarat Utama',
      date: activeSelectedMeeting?.date || new Date().toISOString().split('T')[0],
      startTime: activeSelectedMeeting?.startTime || '09:00',
      endTime: activeSelectedMeeting?.endTime || '10:00',
      participants: activeSelectedMeeting?.participants || '',
      status: 'Completed' as const,
      transcript,
      summary
    };

    // Update historical lists state engine background pipeline
    setMeetings((prev) => prev.map((item) => (item.id === id ? finalizedObject : item)));

    // Set selection reference and move view layout to preview screen
    setActiveSelectedMeeting(finalizedObject);
    setCurrentScreen('GENERATE');
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
          onNavigateToList={() => setCurrentScreen('LIST')}
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

      {currentScreen === 'GENERATE' && activeSelectedMeeting && (
        <GenerateMinutesScreen
          meeting={activeSelectedMeeting}
          // 👈 FIX: Directs routing screen state context back to the Dashboard instead of view minutes layout
          onSaveAndClose={() => setCurrentScreen('DASHBOARD')}
          onBack={() => setCurrentScreen('UPLOAD')}
        />
      )}

      {currentScreen === 'MINUTES' && activeSelectedMeeting && (
        <ViewMinutesScreen
          meeting={activeSelectedMeeting}
          onBack={() => setCurrentScreen('DASHBOARD')}
        />
      )}

      {currentScreen === 'LIST' && (
        <MeetingListScreen
          meetings={meetings}
          onBack={() => setCurrentScreen('DASHBOARD')}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
          onNavigateToList={() => setCurrentScreen('LIST')}     
          onSelectMeeting={handleSelectMeetingEntry}           
        />
      )}
    </View>
  );
}