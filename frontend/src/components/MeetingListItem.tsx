import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Meeting } from '../types';
import { StatusBadge } from './ui/StatusBadge';

interface MeetingListItemProps {
  meeting: Meeting;
  onPress: () => void;
}

export const MeetingListItem: React.FC<MeetingListItemProps> = ({
  meeting,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="
        bg-white
        p-4
        rounded-xl
        mb-3
        border
        border-slate-200
        shadow-sm
      "
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text
          className="text-lg font-bold text-slate-900 flex-1 mr-2"
          numberOfLines={1}
        >
          {meeting.name}
        </Text>

        <StatusBadge status={meeting.status} />
      </View>

      {/* Date & Time */}
      <Text className="text-slate-600 text-sm mb-1.5">
        📅 {meeting.date} | ⏰ {meeting.startTime} - {meeting.endTime}
      </Text>

      {/* Participants */}
      <Text
        className="text-slate-400 text-xs font-medium"
        numberOfLines={1}
      >
        👥 Participants: {meeting.participants || 'None listed'}
      </Text>
    </TouchableOpacity>
  );
};