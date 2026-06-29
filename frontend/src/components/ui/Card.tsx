import React from 'react';
import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
}) => {
  return (
    <View
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}
    >
      {children}
    </View>
  );
};