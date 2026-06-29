import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AppLayout } from '../components/layout/AppLayout';
import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface MinutesProductionScreenProps {
  meeting: Meeting;
  onBack: () => void;
  onNavigateToSetup?: () => void;
  onNavigateToList?: () => void;
  onNavigateToDashboard?: () => void;
}

export const MinutesProductionScreen: React.FC<MinutesProductionScreenProps> = ({
  meeting,
  onBack,
  onNavigateToSetup = () => {},
  onNavigateToList = () => {},
  onNavigateToDashboard = () => {},
}) => {
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
            <Text className="text-blue-900 font-bold text-sm">← Kembali ke Utama</Text>
          </TouchableOpacity>

          {/* Header */}
          <View className="mb-6 flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-slate-900 tracking-tight">Dokumen Minit Rasmi Akhir</Text>
              <Text className="text-slate-500 text-sm mt-0.5">Status: Disahkan & Disimpan</Text>
            </View>
            <TouchableOpacity className="bg-blue-900 px-4 py-2 rounded-xl active:opacity-90">
              <Text className="text-white text-xs font-bold">🖨️ Cetak PDF</Text>
            </TouchableOpacity>
          </View>

          <Panel className="p-6 md:p-10 bg-white border border-slate-200 shadow-md rounded-2xl mb-6">
            
            {/* Main Title Letterhead */}
            <View className="items-center border-b-4 border-double border-slate-900 pb-4 mb-6">
              <Text className="text-base md:text-lg font-black text-slate-900 uppercase tracking-widest text-center">MINIT MESYUARAT RASMI</Text>
              <Text className="text-xs md:text-sm font-extrabold text-slate-700 uppercase mt-1 text-center">{meeting.name}</Text>
            </View>

            {/* Structured Table Info box wrapper */}
            <View className="border border-slate-300 rounded-lg overflow-hidden mb-6">
              <View className="flex-row border-b border-slate-300 bg-slate-50">
                <View className="w-1/4 p-3 border-r border-slate-300 bg-slate-100"><Text className="font-bold text-xs text-slate-700">Tarikh</Text></View>
                <View className="w-3/4 p-3"><Text className="text-xs text-slate-900">{meeting.date}</Text></View>
              </View>
              <View className="flex-row border-b border-slate-300">
                <View className="w-1/4 p-3 border-r border-slate-300 bg-slate-100"><Text className="font-bold text-xs text-slate-700">Masa</Text></View>
                <View className="w-3/4 p-3"><Text className="text-xs text-slate-900">{meeting.startTime} - {meeting.endTime}</Text></View>
              </View>
              <View className="flex-row border-b border-slate-300 bg-slate-50">
                <View className="w-1/4 p-3 border-r border-slate-300 bg-slate-100"><Text className="font-bold text-xs text-slate-700">Tempat</Text></View>
                <View className="w-3/4 p-3"><Text className="text-xs text-slate-900">{meeting.location}</Text></View>
              </View>
              <View className="flex-row">
                <View className="w-1/4 p-3 border-r border-slate-300 bg-slate-100"><Text className="font-bold text-xs text-slate-700">Kehadiran</Text></View>
                <View className="w-3/4 p-3"><Text className="text-xs text-slate-900 leading-5">{meeting.participants || '-'}</Text></View>
              </View>
            </View>

            {/* Document Content */}
            <View className="mt-4">
              <Text className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">1.0 Perkara / Ketetapan Utama</Text>
              <Text className="text-slate-800 text-sm leading-7 whitespace-pre-line px-1 text-left alignment-normal">
                {meeting.summary}
              </Text>
            </View>

            {/* Signatory Blocks */}
            <View className="flex-row justify-between mt-16 pt-8 border-t border-slate-100">
              <View className="w-[45%]">
                <Text className="text-xs text-slate-400 mb-12">Disediakan oleh,</Text>
                <View className="border-b border-slate-400 w-full mb-1" />
                <Text className="text-xs font-bold text-slate-700">Urusetia / Setiausaha</Text>
              </View>
              <View className="w-[45%]">
                <Text className="text-xs text-slate-400 mb-12">Disahkan oleh,</Text>
                <View className="border-b border-slate-400 w-full mb-1" />
                <Text className="text-xs font-bold text-slate-700">Pengerusi Mesyuarat</Text>
              </View>
            </View>
          </Panel>
        </View>
      </PageContainer>
    </AppLayout>
  );
};