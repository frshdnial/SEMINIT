import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface FormatMinutesScreenProps {
  meeting: Meeting;
  onSaveAndConfirm: (finalSummary: string) => void;
  onBack: () => void;
}

export const FormatMinutesScreen: React.FC<FormatMinutesScreenProps> = ({
  meeting,
  onSaveAndConfirm,
  onBack,
}) => {
  // Initialize editable field with the current summary text
  const [editableSummary, setEditableSummary] = useState(meeting.summary || '');

  return (
    <PageContainer>
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} className="mb-4 py-1">
        <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-slate-900 tracking-tight">
          Format Minit Mesyuarat Rasmi
        </Text>
        <Text className="text-slate-500 text-sm mt-1">
          Sunting dan sahkan layout templat standard.
        </Text>
      </View>

      <ScrollView className="flex-1 mb-4" showsVerticalScrollIndicator={false}>
        {/* Template Render Container */}
        <Panel className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
          
          {/* Official Letterhead Header */}
          <View className="items-center border-b-2 border-slate-900 pb-4 mb-6">
            <Text className="text-base font-extrabold text-slate-900 uppercase tracking-widest">
              MINIT MESYUARAT STANDARD
            </Text>
            <Text className="text-sm font-bold text-slate-700 uppercase mt-1">
              {meeting.name || 'NAMA MESYUARAT TIDAK DINYATAKAN'}
            </Text>
          </View>

          {/* Metadata Grid Block */}
          <View className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 gap-y-2">
            <View className="flex-row">
              <Text className="w-24 font-bold text-xs text-slate-600">Tarikh:</Text>
              <Text className="flex-1 text-xs text-slate-800">{meeting.date || '-'}</Text>
            </View>
            <View className="flex-row">
              <Text className="w-24 font-bold text-xs text-slate-600">Masa:</Text>
              <Text className="flex-1 text-xs text-slate-800">
                {meeting.startTime || '-'} hingga {meeting.endTime || '-'}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="w-24 font-bold text-xs text-slate-600">Lokasi:</Text>
              <Text className="flex-1 text-xs text-slate-800">{meeting.location || '-'}</Text>
            </View>
            <View className="flex-row">
              <Text className="w-24 font-bold text-xs text-slate-600">Kehadiran:</Text>
              <Text className="flex-1 text-xs text-slate-800">
                {meeting.participants || 'Tiada maklumat kehadiran diisi.'}
              </Text>
            </View>
          </View>

          {/* Section: Perkara Utama / Ringkasan AI (Editable Input) */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Kandungan & Tindakan Mesyuarat:
            </Text>
            
            <TextInput
              multiline
              value={editableSummary}
              onChangeText={setEditableSummary}
              className="w-full min-h-[250px] bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 text-sm leading-6 font-sans text-left alignment-normal"
              textAlignVertical="top"
              placeholder="Masukkan ringkasan minit di sini..."
            />
          </View>
        </Panel>
      </ScrollView>

      {/* Action Footer Navigation buttons */}
      <View className="mb-4">
        <TouchableOpacity
          onPress={() => onSaveAndConfirm(editableSummary)}
          className="w-full h-12 bg-emerald-600 rounded-xl items-center justify-center shadow-sm active:bg-emerald-700"
        >
          <Text className="text-white font-bold text-sm">
            Sahkan & Simpan Minit Mesyuarat Rasmi
          </Text>
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};