import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Define a TypeScript interface for the mock meeting data to remove editor warnings
interface MeetingData {
  title: string;
  summary: string;
  actions: { assignee: string; task: string }[];
}

export default function MinutesDetail() {
  // 1. Explicitly cast hook search params to handle TypeScript string checking
  const { id } = useLocalSearchParams<{ id: string }>();

  // 2. Safely type parameters to clear red wavy compiler lines
  const handleExport = (format: 'pdf' | 'docx') => {
    Alert.alert(
      'Export Triggered', 
      `Processing document conversion pipeline for ID: ${id} into format: .${format}`
    );
  };

  // Mock data safely isolated inside the component render scope
  const meetingDetails: MeetingData = {
    title: 'FYP Progress Review Session',
    summary: 'The team successfully finalized the Software Design Document blueprints. Frontend routing configurations are to be completed before Sprint 3 implementation phases initiate.',
    actions: [
      { assignee: 'Hafiz', task: 'Map Azure Speech Recognition API pipeline wrapper configurations.' },
      { assignee: 'Jeremy', task: 'Establish indexing structures for optimized MongoDB metadata lookups.' }
    ]
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      {/* Header Container */}
      <View className="border-b border-gray-200 pb-4 mb-4">
        <Text className="text-2xl font-bold text-gray-900">{meetingDetails.title}</Text>
        <Text className="text-gray-500 text-xs mt-1">Generated via Seminit AI Engine (OpenAI API Layer)</Text>
      </View>

      {/* Brief Summary Block */}
      <View className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
        <Text className="text-royal-blue-dark font-bold mb-1 text-sm">💡 Executive Summary</Text>
        <Text className="text-gray-700 text-sm leading-relaxed">
          {meetingDetails.summary}
        </Text>
      </View>

      {/* Extracted Action Items */}
      <Text className="text-gray-800 font-bold text-lg mb-2">🎯 Action Item Detection Matrix</Text>
      <View className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
        {meetingDetails.actions.map((item, index) => (
          <View key={index} className="flex-row items-start mb-3 last:mb-0">
            <Text className="text-gold font-bold mr-2 text-base">•</Text>
            <Text className="text-gray-700 text-sm flex-1">
              <Text className="font-bold text-gray-900">{item.assignee}:</Text> {item.task}
            </Text>
          </View>
        ))}
      </View>

      {/* Export Options Section */}
      <Text className="text-gray-800 font-bold text-base mb-3">Export Data Formats Available</Text>
      
      {/* Fully Compatible Flex Layout Row Container */}
      <View className="flex-row justify-between pb-10">
        <TouchableOpacity 
          onPress={() => handleExport('pdf')} 
          className="flex-1 bg-royal-blue py-3 rounded-lg items-center justify-center mr-2"
        >
          <Text className="text-white font-semibold text-xs">Export PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleExport('docx')} 
          className="flex-1 bg-gold/10 py-3 rounded-lg items-center justify-center mr-2 border border-gold"
        >
          <Text className="text-amber-800 font-semibold text-xs">Word Document</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.back()} 
          className="flex-1 bg-royal-blue-dark py-3 rounded-lg items-center justify-center"
        >
          <Text className="text-gold font-semibold text-xs">Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}