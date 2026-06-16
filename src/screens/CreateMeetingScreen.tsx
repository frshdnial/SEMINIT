import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { CustomInput } from '../components/CustomInput';
import { Meeting } from '../types';

interface CreateMeetingScreenProps {
  onSaveMeeting: (meeting: Meeting) => void;
  onBack: () => void;
}

export const CreateMeetingScreen: React.FC<CreateMeetingScreenProps> = ({ onSaveMeeting, onBack }) => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleFormSubmission = () => {
    if (!name || !date || !startTime || !endTime) {
      Alert.alert('Validation Error', 'Please map constraints across Name, Date, and Timeline windows.');
      return;
    }

    const constructedPayload: Meeting = {
      id: Date.now().toString(),
      name,
      participants,
      date,
      startTime,
      endTime,
      status: 'Pending Audio'
    };

    onSaveMeeting(constructedPayload);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity onPress={onBack} className="mb-4 py-1">
          <Text className="text-blue-900 font-bold text-sm">← Back to Workspace</Text>
        </TouchableOpacity>

        <Text className="text-2xl font-extrabold text-blue-950 mb-1">Configure Meeting Framework</Text>
        <Text className="text-gray-500 text-xs mb-6">Initialize structural system indices before launching transcription streams.</Text>

        <CustomInput label="Meeting Title / Session Name" placeholder="e.g., SDD Blueprint Integration Sync" value={name} onChangeText={setName} />
        <CustomInput label="Active Attendants & Roles" placeholder="e.g., Farish, Hafiz, Jeremy, Hurin" value={participants} onChangeText={setParticipants} />
        <CustomInput label="Target Date Window" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
        <CustomInput label="Session Target Start Time" placeholder="e.g., 14:00" value={startTime} onChangeText={setStartTime} />
        <CustomInput label="Session Target End Time" placeholder="e.g., 15:30" value={endTime} onChangeText={setEndTime} />

        <View className="mt-4">
          <ActionButton title="Save & Process Audio Upload" onPress={handleFormSubmission} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};