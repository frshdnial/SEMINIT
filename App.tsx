import { API_ENDPOINTS } from '@/config/api'; // Added backend endpoints mapping configurations
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import "./global.css";

import { AudioUploadScreen } from '@/screens/AudioUploadScreen';
import { CreateMeetingScreen } from '@/screens/CreateMeetingScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { FormatMinutesScreen } from '@/screens/FormatMinutesScreen';
import { GenerateMinutesScreen } from '@/screens/GenerateMinutesScreen';
import { MeetingListScreen } from '@/screens/MeetingListScreen';
import { MinutesProductionScreen } from '@/screens/MinutesProductionScreen';
import { ViewMinutesScreen } from '@/screens/ViewMinutesScreen';
import { Meeting } from '@/types';

type ScreenState = 'DASHBOARD' | 'CREATE' | 'UPLOAD' | 'GENERATE' | 'FORMAT' | 'PRODUCTION' | 'MINUTES' | 'LIST';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('DASHBOARD');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [activeSelectedMeeting, setActiveSelectedMeeting] = useState<Meeting | null>(null);

  // Helper function to query the Laravel database backend
  const refreshMeetingsFromDatabase = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.getMeetings);
      if (response.ok) {
        const data = await response.json();
        setMeetings(data);
      } else {
        console.warn('Gagal membaca data dari pangkalan data');
      }
    } catch (error) {
      console.error('Ralat ketika memanggil backend Laravel:', error);
    }
  };

  // Run the database fetch pipeline on initial layout initialization
  useEffect(() => {
    refreshMeetingsFromDatabase();
  }, []);

  const handleCreateMeetingComplete = (newMeeting: Meeting) => {
    // Sync UI array list dynamically by appending the newly registered row from MySQL
    setMeetings([newMeeting, ...meetings]);
    setActiveSelectedMeeting(newMeeting);
    setCurrentScreen('UPLOAD');
  };

  const handleAudioProcessingComplete = (id: string | number, transcript: string, summary: string) => {
    // Sync the local meetings state arrays immediately to avoid stale rows in dashboard rendering
    setMeetings(prevMeetings => 
      prevMeetings.map(m => 
        m.id.toString() === id.toString()
          ? { ...m, transcript, summary, status: 'Completed' }
          : m
      )
    );

    // Ensure the targeted focused meeting pointer is synced too before moving screens
    if (activeSelectedMeeting && activeSelectedMeeting.id.toString() === id.toString()) {
      setActiveSelectedMeeting({
        ...activeSelectedMeeting,
        transcript,
        summary,
        status: 'Completed'
      });
    }

    setCurrentScreen('GENERATE');
  };

  const handleFinalizedMinutesSaving = async (finalSummary: string) => {
    if (!activeSelectedMeeting) return;

    try {
      // Persist the updated, edited markdown contents back into MySQL rows
      const response = await fetch(API_ENDPOINTS.updateMeetingNlp(activeSelectedMeeting.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          transcript: activeSelectedMeeting.transcript,
          summary: finalSummary,
          status: 'Completed'
        }),
      });

      if (response.ok) {
        // Update local components view configurations
        setMeetings(prevMeetings =>
          prevMeetings.map(m =>
            m.id.toString() === activeSelectedMeeting.id.toString()
              ? { ...m, summary: finalSummary, status: 'Completed' }
              : m
          )
        );

        setActiveSelectedMeeting({
          ...activeSelectedMeeting,
          summary: finalSummary,
          status: 'Completed'
        });

        setCurrentScreen('PRODUCTION');
      } else {
        alert('Gagal mengemaskini draf minit dalam pangkalan data.');
      }
    } catch (error) {
      console.error('Error saving updated summary text:', error);
      alert('Ralat sambungan rangkaian ke pelayan.');
    }
  };

  // Selecting a meeting from the Dashboard or Meeting List (Senarai Mesyuarat):
  // 'Pending Audio' meetings still need a recording, so jump back into the
  // upload workflow. Anything else is treated as finished and goes straight
  // to the final minutes production/document view.
  const handleSelectMeetingFromList = (meeting: Meeting) => {
    setActiveSelectedMeeting(meeting);

    if (meeting.status === 'Pending Audio') {
      setCurrentScreen('UPLOAD');
    } else {
      setCurrentScreen('PRODUCTION');
    }
  };

  return (
    <View className="flex-1 bg-slate-100">
      <StatusBar style="auto" />

      {currentScreen === 'DASHBOARD' && (
        <DashboardScreen
          meetings={meetings}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
          onNavigateToList={() => setCurrentScreen('LIST')}
          onSelectMeeting={handleSelectMeetingFromList}
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
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onNavigateToList={() => setCurrentScreen('LIST')}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
        />
      )}

      {currentScreen === 'GENERATE' && activeSelectedMeeting && (
        <GenerateMinutesScreen
          meeting={activeSelectedMeeting}
          onSaveAndClose={() => setCurrentScreen('FORMAT')}
          onBack={() => setCurrentScreen('UPLOAD')}
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onNavigateToList={() => setCurrentScreen('LIST')}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
        />
      )}

      {currentScreen === 'FORMAT' && activeSelectedMeeting && (
        <FormatMinutesScreen
          meeting={activeSelectedMeeting}
          onSaveAndConfirm={handleFinalizedMinutesSaving}
          onBack={() => setCurrentScreen('GENERATE')}
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onNavigateToList={() => setCurrentScreen('LIST')}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
        />
      )}

      {currentScreen === 'PRODUCTION' && activeSelectedMeeting && (
        <MinutesProductionScreen
          meeting={activeSelectedMeeting}
          onBack={() => {
            refreshMeetingsFromDatabase(); // Refresh layout states on redirect
            setCurrentScreen('DASHBOARD');
          }}
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onNavigateToList={() => setCurrentScreen('LIST')}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
        />
      )}

      {currentScreen === 'MINUTES' && activeSelectedMeeting && (
        <ViewMinutesScreen
          meeting={activeSelectedMeeting}
          onBack={() => {
            refreshMeetingsFromDatabase();
            setCurrentScreen('DASHBOARD');
          }}
        />
      )}

      {currentScreen === 'LIST' && (
        <MeetingListScreen
          meetings={meetings}
          onBack={() => setCurrentScreen('DASHBOARD')}
          onNavigateToSetup={() => setCurrentScreen('CREATE')}
          NavigateToViewMeetings={() => setCurrentScreen('LIST')}
          onNavigateToDashboard={() => setCurrentScreen('DASHBOARD')}
          onSelectMeeting={handleSelectMeetingFromList}
        />
      )}
    </View>
  );
}