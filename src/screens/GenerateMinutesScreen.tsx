import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AppLayout } from '../components/layout/AppLayout';
import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface GenerateMinutesScreenProps {
  meeting: Meeting;
  onSaveAndClose: () => void;
  onBack: () => void;
  onNavigateToSetup?: () => void;
  onNavigateToList?: () => void;
  onNavigateToDashboard?: () => void;
}

export const GenerateMinutesScreen: React.FC<GenerateMinutesScreenProps> = ({
  meeting,
  onSaveAndClose,
  onBack,
  onNavigateToSetup = () => {},
  onNavigateToList = () => {},
  onNavigateToDashboard = () => {},
}) => {
  const [subViewTab, setSubViewTab] = useState<'transcript' | 'summary'>('summary');

  return (
    <AppLayout
      activeRoute="CreateMeeting"
      onNavigateToSetup={onNavigateToSetup}
      onNavigateToList={onNavigateToList}
      onNavigateToDashboard={onNavigateToDashboard}
    >
      <PageContainer>
        <View className="w-full max-w-4xl mx-auto px-4 py-2">
          {/* Back Button */}
          <TouchableOpacity onPress={onBack} className="mb-4 py-1 self-start">
            <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
          </TouchableOpacity>

          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-slate-900 tracking-tight">{meeting.name}</Text>
            <Text className="text-slate-500 text-sm mt-0.5">Draf Paparan Hasil AI Terbina</Text>
          </View>

          {/* Blueprint Container */}
          <Panel className="p-0 overflow-hidden mb-6">
            <View className="flex-row border-b border-slate-200 bg-slate-50">
              <TouchableOpacity
                className={`flex-1 py-4 items-center ${subViewTab === 'summary' ? 'border-b-2 border-blue-900 bg-white' : ''}`}
                onPress={() => setSubViewTab('summary')}
              >
                <Text className={`font-bold text-xs md:text-sm ${subViewTab === 'summary' ? 'text-blue-900' : 'text-slate-400'}`}>Ringkasan Eksekutif</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-4 items-center ${subViewTab === 'transcript' ? 'border-b-2 border-blue-900 bg-white' : ''}`}
                onPress={() => setSubViewTab('transcript')}
              >
                <Text className={`font-bold text-xs md:text-sm ${subViewTab === 'transcript' ? 'text-blue-900' : 'text-slate-400'}`}>Transkrip Penuh</Text>
              </TouchableOpacity>
            </View>

            {/* Core Text presentation without internal scroll boxes */}
            <View className="p-6 bg-white">
              {subViewTab === 'summary' ? (
                <Text className="text-slate-800 text-sm leading-7 whitespace-pre-line text-left alignment-normal">
                  {meeting.summary || 'Tiada rumusan dihasilkan.'}
                </Text>
              ) : (
                <Text className="text-slate-800 text-sm leading-6 font-mono bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line text-left alignment-normal">
                  {meeting.transcript || 'Tiada transkripsi ditemui.'}
                </Text>
              )}
            </View>

            {/* Metadata Footer */}
            <View className="bg-slate-50 border-t border-slate-100 p-4 px-6">
              <Text className="text-xxs text-slate-400 uppercase tracking-wider">
                Maklumat: {meeting.date} ({meeting.startTime} - {meeting.endTime}) | Lokasi: {meeting.location}
              </Text>
            </View>
          </Panel>

          {/* Primary Action Button */}
          <View className="mb-6">
            <TouchableOpacity 
              onPress={onSaveAndClose}
              className="w-full h-12 bg-blue-900 rounded-xl items-center justify-center shadow-sm active:bg-blue-950"
            >
              <Text className="text-white font-bold text-sm">Sahkan & Semak Format Templat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PageContainer>
    </AppLayout>
  );
};