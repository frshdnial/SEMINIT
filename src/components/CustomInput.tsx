import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <View className="mb-4 w-full">
      <Text className="text-sm font-medium text-slate-700 mb-1">
      {label}
    </Text>
      <TextInput
        className="
        h-12
        px-4
        bg-white
        border
        border-slate-300
        rounded-xl
        text-slate-900
        "
      />
    </View>
  );
};