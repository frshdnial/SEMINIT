import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface GenerateMinutesScreenProps {
  meeting: Meeting;
  onSaveAndClose: () => void;
  onBack: () => void;
}

export const GenerateMinutesScreen: React.FC<GenerateMinutesScreenProps> = ({
  meeting,
  onSaveAndClose,
  onBack,
}) => {
  const [subViewTab, setSubViewTab] = useState<'transcript' | 'summary'>('summary');

  return (
    <PageContainer>
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} className="mb-4 py-1">
        <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-6 flex-row justify-between items-center">
        <View className="flex-1 mr-4">
          <Text className="text-2xl font-bold text-slate-900 tracking-tight" numberOfLines={1}>
            {meeting.name}
          </Text>
          <Text className="text-slate-500 text-sm mt-1">Draf Paparan Hasil AI Terbina</Text>
        </View>
      </View>

      {/* Blueprint Container */}
      <Panel className="p-0 overflow-hidden flex-1 mb-6">
        <View className="flex-row border-b border-slate-200 bg-slate-50">
          <TouchableOpacity
            className={`flex-1 py-4 items-center ${subViewTab === 'summary' ? 'border-b-2 border-blue-900 bg-white' : ''}`}
            onPress={() => setSubViewTab('summary')}
          >
            <Text className={`font-semibold text-sm ${subViewTab === 'summary' ? 'text-blue-900' : 'text-slate-400'}`}>
              Ringkasan Eksekutif
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-4 items-center ${subViewTab === 'transcript' ? 'border-b-2 border-blue-900 bg-white' : ''}`}
            onPress={() => setSubViewTab('transcript')}
          >
            <Text className={`font-semibold text-sm ${subViewTab === 'transcript' ? 'text-blue-900' : 'text-slate-400'}`}>
              Transkrip Penuh
            </Text>
          </TouchableOpacity>
        </View>

        {/* Generated Blueprint Content Area */}
        <ScrollView className="max-h-[450px]" showsVerticalScrollIndicator={false}>
          <View className="p-6">
            {subViewTab === 'summary' ? (
              <Text className="text-slate-800 text-sm leading-7 whitespace-pre-line">
                {meeting.summary || 'Tiada rumusan dihasilkan.'}
              </Text>
            ) : (
              <Text className="text-slate-800 text-sm leading-6 font-mono bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                {meeting.transcript || 'Tiada transkripsi ditemui.'}
              </Text>
            )}
          </View>
        </ScrollView>

        {/* Metadata Footer */}
        <View className="bg-slate-50 border-t border-slate-100 p-4 px-6">
          <Text className="text-xxs text-slate-400 uppercase tracking-wider">
            Maklumat Profil: {meeting.date} ({meeting.startTime} - {meeting.endTime}) | Lokasi: {meeting.location}
          </Text>
        </View>
      </Panel>

      {/* Primary Action Button Row */}
      <View className="mt-2 mb-4">
        {/* Standard React Native button replacement directly invokes onSaveAndClose callback */}
        <TouchableOpacity 
          onPress={onSaveAndClose}
          className="w-full h-12 bg-blue-900 rounded-xl items-center justify-center shadow-sm active:bg-blue-950"
        >
          <Text className="text-white font-bold text-sm">
            Edit Minit Mesyuarat Rasmi
          </Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};