import React, { useCallback, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allMinutes, setAllMinutes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadMeetings = async () => {
        try {
          const stored = await AsyncStorage.getItem('meetings');

          if (stored) {
            setAllMinutes(JSON.parse(stored));
          } else {
            setAllMinutes([]);
          }
        } catch (error) {
          console.log('Error loading meetings:', error);
        }
      };

      loadMeetings();
    }, [])
  );

  const filteredData = allMinutes.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search meeting title, description or location..."
        className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-900 shadow-xs mb-4"
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl border border-gray-100 mb-2">
            <Text className="text-gray-900 font-semibold text-base">
              {item.title}
            </Text>

            <Text className="text-gray-500 text-xs mt-1">
              {item.date}
            </Text>

            {item.location ? (
              <Text className="text-xs text-red-800 mt-1 bg-red-50 self-start px-2 py-0.5 rounded-md">
                {item.location}
              </Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">
            No records match your search.
          </Text>
        }
      />
    </View>
  );
}