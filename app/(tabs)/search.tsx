import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allMinutes = [
    { id: '1', title: 'FYP Progress Review', keyword: 'Design Architecture' },
    { id: '2', title: 'All Day Project Sync', keyword: 'Sprint Planning' }
  ];

  const filteredData = allMinutes.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search keywords, topics or action item assignees..."
        className="w-full bg-white border border-gray-200 p-3.5 rounded-xl text-gray-900 shadow-xs mb-4"
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl border border-gray-100 mb-2">
            <Text className="text-gray-900 font-semibold text-base">{item.title}</Text>
            <Text className="text-xs text-red-800 mt-1 bg-red-50 self-start px-2 py-0.5 rounded-md">
              Tag: {item.keyword}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">No records match your metadata search parameters.</Text>
        }
      />
    </View>
  );
}