import React from 'react';
import { View, ViewStyle } from 'react-native';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <View
      className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 ${className}`}
      style={style}
    >
      {children}
    </View>
  );
};