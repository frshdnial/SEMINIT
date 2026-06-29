import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface ViewMinutesScreenProps {
  meeting: Meeting;
  onBack: () => void;
}

export const ViewMinutesScreen: React.FC<ViewMinutesScreenProps> = ({
  meeting,
  onBack,
}) => {
  const [subViewTab, setSubViewTab] = useState<'transcript' | 'summary'>('summary');

  return (
    <PageContainer>
      <TouchableOpacity onPress={onBack} className="mb-4 py-1">
        <Text className="text-blue-900 font-bold text-sm">← Kembali ke Papan Pemuka</Text>
      </TouchableOpacity>

      <View className="mb-6">
        <Text className="text-2xl font-bold text-slate-900 tracking-tight" numberOfLines={1}>
          {meeting.name}
        </Text>
        <Text className="text-slate-500 text-sm mt-1">Paparan Hasil Arkib Analisis AI</Text>
      </View>

      <Panel className="p-0 overflow-hidden">
        <View className="flex-row border-b border-slate-200">
          <TouchableOpacity
            className={`flex-1 py-4 items-center ${subViewTab === 'summary' ? 'border-b-2 border-blue-900' : ''}`}
            onPress={() => setSubViewTab('summary')}
          >
            <Text className={`font-semibold ${subViewTab === 'summary' ? 'text-blue-900' : 'text-slate-400'}`}>
              Ringkasan Komprehensif
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-4 items-center ${subViewTab === 'transcript' ? 'border-b-2 border-blue-900' : ''}`}
            onPress={() => setSubViewTab('transcript')}
          >
            <Text className={`font-semibold ${subViewTab === 'transcript' ? 'text-blue-900' : 'text-slate-400'}`}>
              Transkrip Teks Penuh
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="max-h-[500px]" showsVerticalScrollIndicator={false}>
          <View className="p-5">
            {subViewTab === 'transcript' ? (
              <Text className="text-slate-800 text-sm leading-6 whitespace-pre-line font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                {meeting.transcript || 'Tiada data transkrip rekod dijumpai.'}
              </Text>
            ) : (
              <Text className="text-slate-800 text-sm leading-6 whitespace-pre-line">
                {meeting.summary || 'Tiada draf rumusan rekod dijumpai.'}
              </Text>
            )}
          </View>
        </ScrollView>
      </Panel>
    </PageContainer>
  );
};