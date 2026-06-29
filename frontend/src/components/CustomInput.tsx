import React from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  required = false,
  multiline,
  ...props
}) => {
  return (
    <View className="mb-4 w-full">
      <Text className="text-slate-700 text-sm font-semibold mb-1.5">
        {label}
        {required && (
          <Text className="text-red-500"> *</Text>
        )}
      </Text>

      <TextInput
        className={`
          w-full
          bg-white
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          text-slate-800
          text-base
        `}
        placeholderTextColor="#94A3B8"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
    </View>
  );
};