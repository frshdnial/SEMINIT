import React from 'react';
import { View } from 'react-native';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
}) => {
  return (
    <View
      className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${className}`}
    >
      {children}
    </View>
  );
};