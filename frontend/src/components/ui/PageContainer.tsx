import React from 'react';
import { SafeAreaView, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const PageContainer: React.FC<Props> = ({
  children,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full mx-auto max-w-7xl p-6 md:p-8">
        {children}
      </View>
    </SafeAreaView>
  );
};