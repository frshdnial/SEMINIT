import React from 'react';
import { Text } from 'react-native';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  accent:
    | 'blue'
    | 'green'
    | 'amber'
    | 'info';
}

const accentStyles = {
  blue: 'border-l-blue-900',
  green: 'border-l-emerald-500',
  amber: 'border-l-amber-500',
  info: 'border-l-blue-500',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  accent,
}) => {
  return (
    <Card
      className={`flex-1 min-w-[220px] p-5 border-l-4 ${accentStyles[accent]}`}
    >
      <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        {title}
      </Text>

      <Text className="text-3xl font-black text-slate-800">
        {value}
      </Text>
    </Card>
  );
};