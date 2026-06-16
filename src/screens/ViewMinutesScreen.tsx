import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Meeting } from '../types';

interface ViewMinutesScreenProps {
  meeting: Meeting;
  onBack: () => void;
}

export const ViewMinutesScreen: React.FC<ViewMinutesScreenProps> = ({ meeting, onBack }) => {
  const [subViewTab, setSubViewTab] = useState<'transcript' | 'summary'>('transcript');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* High-Fidelity App Bar Top Layout */}
      <View className="p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={onBack} className="mb-2">
          <Text className="text-blue-900 font-bold text-sm">← Workspace Grid</Text>
        </TouchableOpacity>
        <Text className="text-xl font-black text-blue-950" numberOfLines={1}>{meeting.name}</Text>
        <Text className="text-gray-400 text-xs mt-0.5">NLP Generation Interface Sandbox</Text>
      </View>

      {/* Segmented Controller Navigation Tabs */}
      <View className="flex-row bg-white border-b border-gray-200">
        <TouchableOpacity 
          className={`flex-1 py-3.5 items-center justify-center ${subViewTab === 'transcript' ? 'border-b-2 border-blue-900' : ''}`}
          onPress={() => setSubViewTab('transcript')}
        >
          <Text className={`text-sm font-bold ${subViewTab === 'transcript' ? 'text-blue-900' : 'text-gray-400'}`}>
            Full Text Transcript
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={`flex-1 py-3.5 items-center justify-center ${subViewTab === 'summary' ? 'border-b-2 border-blue-900' : ''}`}
          onPress={() => setSubViewTab('summary')}
        >
          <Text className={`text-sm font-bold ${subViewTab === 'summary' ? 'text-blue-900' : 'text-gray-400'}`}>
            Summary Matrix
          </Text>
        </TouchableOpacity>
      </View>

      {/* Output Renders Terminal Content Area */}
      <ScrollView className="flex-1 p-4">
        <View className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-10">
          {subViewTab === 'transcript' ? (
            <Text className="text-gray-800 text-sm leading-6 tracking-wide">
              {meeting.transcript || 'No transcripts evaluated.'}
            </Text>
          ) : (
            <Text className="text-gray-800 text-sm leading-6 tracking-wide">
              {meeting.summary || 'No summaries extracted.'}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};