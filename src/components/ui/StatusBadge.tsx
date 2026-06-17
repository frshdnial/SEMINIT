import React from 'react';
import { Text, View } from 'react-native';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
}) => {
  const isCompleted = status === 'Completed';

  return (
    <View
      className={`
        px-2.5
        py-1
        rounded-md
        ${
          isCompleted
            ? 'bg-emerald-100'
            : 'bg-amber-100'
        }
      `}
    >
      <Text
        className={`
          text-xs
          font-bold
          ${
            isCompleted
              ? 'text-emerald-800'
              : 'text-amber-800'
          }
        `}
      >
        {status}
      </Text>
    </View>
  );
};