import React, { useState } from 'react';

// Import all your screen components
import { AudioUploadScreen } from '../screens/AudioUploadScreen';
import { CreateMeetingScreen } from '../screens/CreateMeetingScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { GenerateMinutesScreen } from '../screens/GenerateMinutesScreen';
import { MeetingListScreen } from '../screens/MeetingListScreen';
import { ViewMinutesScreen } from '../screens/ViewMinutesScreen';

import { Meeting } from '../types';

// Declare types for all possible application screen views
type ScreenView = 
  | 'DASHBOARD' 
  | 'CREATE_MEETING' 
  | 'MEETING_LIST' 
  | 'AUDIO_UPLOAD' 
  | 'GENERATE_MINUTES' 
  | 'VIEW_MINUTES';

export default function AppController() {
  // 1. App-wide persistent state for all meetings
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  
  // 2. Navigation routing state management
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('DASHBOARD');
  
  // 3. Context state for tracking the active selected meeting across screens
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);

  // Helper shortcut handlers to pass down to screens
  const navigateToDashboard = () => setCurrentScreen('DASHBOARD');
  const navigateToSetup = () => setCurrentScreen('CREATE_MEETING');
  const navigateToList = () => setCurrentScreen('MEETING_LIST');

  // --- Pipeline Triggers ---

  const handleSaveNewMeeting = (newMeeting: Meeting) => {
    // Save meeting to state array list
    setMeetings((prev) => [newMeeting, ...prev]);
    // Save as active meeting context so the next pipelines can read its info
    setActiveMeeting(newMeeting);
    // Automatically transition to step 2: Audio Upload
    setCurrentScreen('AUDIO_UPLOAD');
  };

  const handleAudioProcessed = (id: string, transcript: string, summary: string) => {
    // Update matching entry inside our master array database state
    setMeetings((prevMeetings) =>
      prevMeetings.map((m) =>
        m.id === id ? { ...m, transcript, summary, status: 'Completed' } : m
      )
    );
    
    // Update current working meeting copy metadata
    if (activeMeeting && activeMeeting.id === id) {
      const updated = { ...activeMeeting, transcript, summary, status: 'Completed' as const };
      setActiveMeeting(updated);
    }
    
    // Transition to step 3: Generate minutes summary workspace layout
    setCurrentScreen('GENERATE_MINUTES');
  };

  const handleSelectMeetingListItem = (meeting: Meeting) => {
    setActiveMeeting(meeting);
    // If it's done, show it; if it still needs configuration steps, pick up where left off
    if (meeting.status === 'Completed') {
      setCurrentScreen('VIEW_MINUTES');
    } else if (meeting.status === 'Pending Audio') {
      setCurrentScreen('AUDIO_UPLOAD');
    }
  };

  // --- Conditional Rendering Routing Engine ---
  switch (currentScreen) {
    case 'DASHBOARD':
      return (
        <DashboardScreen
          meetings={meetings}
          onNavigateToSetup={navigateToSetup}
          onNavigateToList={navigateToList}
          onSelectMeeting={handleSelectMeetingListItem}
        />
      );

    case 'CREATE_MEETING':
      return (
        <CreateMeetingScreen
          onSaveMeeting={handleSaveNewMeeting}
          onBack={navigateToDashboard}
        />
      );

    case 'MEETING_LIST':
      return (
        <MeetingListScreen
              meetings={meetings}
              onNavigateToSetup={navigateToSetup}
              onNavigateToList={navigateToList}
              onBack={navigateToDashboard} onSelectMeeting={function (meeting: Meeting): void {
                  throw new Error('Function not implemented.');
              } }        />
      );

    case 'AUDIO_UPLOAD':
      return activeMeeting ? (
        <AudioUploadScreen
          meeting={activeMeeting}
          onAudioProcessed={handleAudioProcessed}
          onBack={navigateToSetup}
        />
      ) : null;

    case 'GENERATE_MINUTES':
      return activeMeeting ? (
        <GenerateMinutesScreen
          meeting={activeMeeting}
          onSaveAndClose={navigateToDashboard}
          onBack={() => setCurrentScreen('AUDIO_UPLOAD')}
        />
      ) : null;

    case 'VIEW_MINUTES':
      return activeMeeting ? (
        <ViewMinutesScreen
          meeting={activeMeeting}
          onBack={navigateToList}
        />
      ) : null;

    default:
      return (
        <DashboardScreen
          meetings={meetings}
          onNavigateToSetup={navigateToSetup}
          onNavigateToList={navigateToList}
          onSelectMeeting={handleSelectMeetingListItem}
        />
      );
  }
}