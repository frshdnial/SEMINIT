import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'success';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const variantClass = variant === 'primary' ? 'bg-blue-900' : 'bg-emerald-600';
  
  return (
    <TouchableOpacity 
      className={`w-full py-3.5 rounded-xl items-center justify-center my-2 shadow-sm ${variantClass}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text className="text-white font-bold text-base tracking-wide">{title}</Text>
    </TouchableOpacity>
  );
};