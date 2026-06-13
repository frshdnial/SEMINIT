import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  location?: string;
  description?: string;
}

export default function DashboardScreen() {
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadMeetings = async () => {
        try {
          const stored = await AsyncStorage.getItem('meetings');

          if (stored) {
            setRecentMeetings(JSON.parse(stored));
          } else {
            setRecentMeetings([]);
          }
        } catch (error) {
          console.log('Failed to load meetings:', error);
        }
      };

      loadMeetings();
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header Banner */}
      <View className="bg-royal-blue-dark rounded-2xl p-5 mb-6 shadow-md border-b-4 border-gold">
        <Text className="text-gold text-2xl font-bold mb-1">
          Hello, Team!
        </Text>
        <Text className="text-blue-100 text-sm">
          Transform your discussions into structured deliverables instantly.
        </Text>
      </View>

      {/* Create Meeting Button */}
      <TouchableOpacity
        onPress={() => router.push('/meeting-setup')}
        className="bg-royal-blue py-4 px-6 rounded-xl items-center shadow-sm active:opacity-90 mb-6"
      >
        <Text className="text-white font-bold text-lg">
          + Create New Meeting Minutes
        </Text>
      </TouchableOpacity>

      {/* Meeting History */}
      <Text className="text-gray-800 text-lg font-bold mb-3">
        Recent Handled Meetings
      </Text>

      {recentMeetings.length === 0 ? (
        <View className="bg-white p-4 rounded-xl border border-gray-200">
          <Text className="text-gray-500 text-center">
            No meeting minutes generated yet.
          </Text>
        </View>
      ) : (
        recentMeetings.map((meeting) => (
          <View
            key={meeting.id}
            className="bg-white p-4 rounded-xl border-l-4 border-l-gold border-y border-r border-gray-200 mb-3 shadow-xs flex-row justify-between items-center"
          >
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold text-base">
                {meeting.title}
              </Text>

              <Text className="text-gray-500 text-xs mt-1">
                {meeting.date} • {meeting.duration}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push(`/minutes/${meeting.id}`)}
              className="border border-royal-blue px-3 py-1.5 rounded-lg"
            >
              <Text className="text-royal-blue font-medium text-xs">
                View Minutes
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}