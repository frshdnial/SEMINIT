import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <View className="mb-4 w-full">
      <Text className="text-gray-700 text-sm font-semibold mb-1.5">{label}</Text>
      <TextInput
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-brandPrimary text-base"
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
};