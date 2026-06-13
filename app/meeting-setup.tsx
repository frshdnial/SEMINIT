import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MeetingSetup() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (!title.trim()) {
      Alert.alert('Missing Info', 'Please provide a valid Meeting Title first.');
      return;
    }
    
    if(!isRecording) {
      setIsRecording(true);
      // Logic for background audio stream triggers here (Microsoft Azure Speech API integration interface)
    } else {
      setIsRecording(false);
      Alert.alert(
        'Recording Stoppage', 
        'Audio recording captured successfully! Proceeding to document AI summaries.',
        [{ text: 'Generate Minutes', onPress: () => router.replace('/minutes/new-preview') }]
      );
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-between">
      <View className="space-y-4">
        <Text className="text-gray-700 font-medium mb-1 text-sm">Meeting Title / Topic</Text>
        <TextInput 
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Weekly Software Design Review"
          className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-lg mb-4 text-gray-900 focus:border-red-800"
        />

        <Text className="text-gray-700 font-medium mb-1 text-sm">Meeting Context Category</Text>
        <View className="flex-row space-x-2 mb-6">
          {['General', 'Technical', 'Management'].map((type) => (
            <TouchableOpacity 
              key={type} 
              onPress={() => setCategory(type)}
              className={`px-4 py-2 rounded-full mr-2 ${category === type ? 'bg-red-800' : 'bg-gray-100'}`}
            >
              <Text className={category === type ? 'text-white font-medium' : 'text-gray-600'}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* State Indicator UI */}
        <View className="items-center justify-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <View className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${isRecording ? 'bg-red-200 animate-pulse' : 'bg-gray-200'}`}>
            <View className={`w-6 h-6 rounded-full ${isRecording ? 'bg-red-600' : 'bg-gray-400'}`} />
          </View>
          <Text className="text-gray-700 font-medium">
            {isRecording ? 'Transcribing live session audio...' : 'Microphone Ready'}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={toggleRecording}
        className={`w-full py-4 rounded-xl items-center shadow-xs ${isRecording ? 'bg-gray-900' : 'bg-red-800'}`}
      >
        <Text className="text-white font-bold text-base">
          {isRecording ? 'Stop & Parse Audio Stream' : 'Start Audio Input Stream'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}