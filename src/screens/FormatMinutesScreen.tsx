import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppLayout } from '../components/layout/AppLayout';
import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface FormatMinutesScreenProps {
  meeting: Meeting;
  onSaveAndConfirm: (finalSummary: string) => void;
  onBack: () => void;
  onNavigateToSetup?: () => void;
  onNavigateToList?: () => void;
  onNavigateToDashboard?: () => void;
}

export const FormatMinutesScreen: React.FC<FormatMinutesScreenProps> = ({
  meeting,
  onSaveAndConfirm,
  onBack,
  onNavigateToSetup = () => {},
  onNavigateToList = () => {},
  onNavigateToDashboard = () => {},
}) => {
  const [editableSummary, setEditableSummary] = useState(meeting.summary || '');

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
            <Text className="text-2xl font-bold text-slate-900 tracking-tight">Format Minit Mesyuarat Rasmi</Text>
            <Text className="text-slate-500 text-sm mt-1">Sunting dan sahkan ringkasan layout templat standard.</Text>
          </View>

          <Panel className="p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl mb-6">
            
            {/* Official Letterhead Header */}
            <View className="items-center border-b-2 border-slate-900 pb-4 mb-6">
              <Text className="text-sm md:text-base font-extrabold text-slate-900 uppercase tracking-widest text-center">MINIT MESYUARAT STANDARD</Text>
              <Text className="text-xs md:text-sm font-bold text-slate-700 uppercase mt-1 text-center">{meeting.name}</Text>
            </View>

            {/* Metadata Grid Block */}
            <View className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex flex-col md:flex-row md:flex-wrap gap-4">
              <View className="w-full md:w-[48%] flex-row"><Text className="w-24 font-bold text-xs text-slate-600">Tarikh:</Text><Text className="text-xs text-slate-800">{meeting.date}</Text></View>
              <View className="w-full md:w-[48%] flex-row"><Text className="w-24 font-bold text-xs text-slate-600">Masa:</Text><Text className="text-xs text-slate-800">{meeting.start_time} - {meeting.end_time}</Text></View>
              <View className="w-full md:w-[48%] flex-row"><Text className="w-24 font-bold text-xs text-slate-600">Lokasi:</Text><Text className="text-xs text-slate-800">{meeting.location}</Text></View>
              <View className="w-full md:w-[48%] flex-row"><Text className="w-24 font-bold text-xs text-slate-600">Kehadiran:</Text><Text className="text-xs text-slate-800 flex-1">{meeting.participants || '-'}</Text></View>
            </View>

            {/* Section Summary Input area */}
            <View className="mb-2">
              <Text className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Kandungan & Tindakan Mesyuarat:</Text>
              <TextInput
                multiline
                value={editableSummary}
                onChangeText={setEditableSummary}
                scrollEnabled={false} // Lets the template expand downward inside the layout's viewport scroll
                className="w-full min-h-[250px] bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 text-sm leading-6 font-sans text-left alignment-normal"
                textAlignVertical="top"
              />
            </View>
          </Panel>

          <View className="mb-6">
            <TouchableOpacity
              onPress={() => onSaveAndConfirm(editableSummary)}
              className="w-full h-12 bg-emerald-600 rounded-xl items-center justify-center shadow-sm active:bg-emerald-700"
            >
              <Text className="text-white font-bold text-sm">Sahkan & Simpan Minit Mesyuarat Rasmi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PageContainer>
    </AppLayout>
  );
};