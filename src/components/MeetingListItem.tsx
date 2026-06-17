import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Meeting } from '../types';

interface MeetingListItemProps {
  meeting: Meeting;
  onPress: () => void;
}

export const MeetingListItem: React.FC<MeetingListItemProps> = ({ meeting, onPress }) => {
  const isDone = meeting.status === 'Completed';

  return (
    <TouchableOpacity
      className="
        flex-row
        justify-between
        items-center
        p-4
        mb-3
        border
        border-slate-200
        rounded-xl
        bg-white
      "
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-blue-950 flex-1 mr-2" numberOfLines={1}>
          {meeting.name}
        </Text>
        <View className={`px-2.5 py-1 rounded-md ${isDone ? 'bg-emerald-100' : 'bg-amber-100'}`}>
          <Text className={`text-xs font-bold ${isDone ? 'text-emerald-800' : 'text-amber-800'}`}>
            {meeting.status}
          </Text>
        </View>
      </View>
      
      <Text className="text-gray-600 text-sm mb-1.5">
        📅 {meeting.date}  |  ⏰ {meeting.startTime} - {meeting.endTime}
      </Text>
      <Text className="text-gray-400 text-xs font-medium" numberOfLines={1}>
        👥 Participants: {meeting.participants || 'None listed'}
      </Text>
    </TouchableOpacity>
  );
};