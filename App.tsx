import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';
import "./global.css";

import { AudioUploadScreen } from '@/screens/AudioUploadScreen';
import { CreateMeetingScreen } from '@/screens/CreateMeetingScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { FormatMinutesScreen } from '@/screens/FormatMinutesScreen';
import { GenerateMinutesScreen } from '@/screens/GenerateMinutesScreen';
import { MeetingListScreen } from '@/screens/MeetingListScreen';
import { MinutesProductionScreen } from '@/screens/MinutesProductionScreen'; // 👈 1. Import new file
import { ViewMinutesScreen } from '@/screens/ViewMinutesScreen';
import { Meeting } from '@/types';

// 👈 2. Add 'PRODUCTION' into the configuration state
type ScreenState = 'DASHBOARD' | 'CREATE' | 'UPLOAD' | 'GENERATE' | 'FORMAT' | 'PRODUCTION' | 'MINUTES' | 'LIST';

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

    setMeetings((prev) => prev.map((item) => (item.id === id ? finalizedObject : item)));
    setActiveSelectedMeeting(finalizedObject);
    setCurrentScreen('GENERATE');
  };

  const handleFinalizedMinutesSaving = (finalSummary: string) => {
    if (!activeSelectedMeeting) return;

    const lockedMeeting: Meeting = {
      ...activeSelectedMeeting,
      summary: finalSummary,
    };

    setMeetings((prev) =>
      prev.map((item) => (item.id === lockedMeeting.id ? lockedMeeting : item))
    );
    setActiveSelectedMeeting(lockedMeeting);
    
    // Redirect cleanly back to Dashboard
    setCurrentScreen('DASHBOARD');
  };

  const handleSelectMeetingEntry = (meeting: Meeting) => {
    setActiveSelectedMeeting(meeting);
    if (meeting.status === 'Completed') {
      // 👈 3. Route finished documents directly into the brand new production styling layout
      setCurrentScreen('PRODUCTION'); 
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
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onNavigateToList={() => setCurrentScreen('LIST')}
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
          onSaveAndClose={() => setCurrentScreen('FORMAT')}
          onBack={() => setCurrentScreen('UPLOAD')}
        />
      )}

      {currentScreen === 'FORMAT' && activeSelectedMeeting && (
        <FormatMinutesScreen
          meeting={activeSelectedMeeting}
          onSaveAndConfirm={handleFinalizedMinutesSaving}
          onBack={() => setCurrentScreen('GENERATE')}
        />
      )}

      {/* 👈 4. Mount and bind the new custom Production Screen View */}
      {currentScreen === 'PRODUCTION' && activeSelectedMeeting && (
        <MinutesProductionScreen
          meeting={activeSelectedMeeting}
          onBack={() => setCurrentScreen('DASHBOARD')}
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
          NavigateToViewMeetings={() => setCurrentScreen('LIST')}
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onSelectMeeting={handleSelectMeetingEntry}
        />
      )}
    </View>
  );
}