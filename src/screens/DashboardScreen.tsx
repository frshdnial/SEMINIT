import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { AppLayout } from '../components/layout/AppLayout';
import { MeetingListItem } from '../components/MeetingListItem';
import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { StatCard } from '../components/ui/StatCard';
import { Meeting } from '../types';

interface DashboardScreenProps {
  meetings: Meeting[];
  onNavigateToSetup: () => void;
  onNavigateToList: () => void;
  onSelectMeeting: (meeting: Meeting) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  meetings,
  onNavigateToSetup,
  onNavigateToList,
  onSelectMeeting,
}) => {
  const totalMeetings = meetings.length;
  const completedMeetings = meetings.filter((m) => m.status === 'Completed').length;
  const processingMeetings = meetings.filter((m) => m.status === 'Pending Audio').length;

  return (
    <AppLayout
      activeRoute="Dashboard" 
      onNavigateToSetup={onNavigateToSetup}
      onNavigateToList={onNavigateToList}
      onNavigateToDashboard={() => {}} // optional, can wire navigation if needed
    >
      <PageContainer>
        {/* Header */}
        <View className="mb-6 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-slate-900 tracking-tight">
            Papan Pemuka
          </Text>
          <View className="md:hidden">
            <ActionButton title="+ Baru" onPress={onNavigateToSetup} fullWidth={false} />
          </View>
        </View>

        {/* Statistics */}
        <View className="flex-row flex-wrap gap-4 mb-8 w-full">
          <StatCard title="Jumlah Mesyuarat" value={totalMeetings} accent="blue" />
          <StatCard title="Minit Siap" value={completedMeetings} accent="green" />
          <StatCard title="Tindakan Susulan" value={processingMeetings} accent="amber" />
          <StatCard title="Jam Dijimatkan" value="16 Jam" accent="info" />
        </View>

        <View className="flex-1 flex-col lg:flex-row gap-6 items-stretch w-full">
          {/* Chart Graphic Area */}
          <Panel className="flex-1 lg:max-w-xs justify-between">
            <View>
              <Text className="text-base font-bold text-slate-900 mb-1">Status Analisis</Text>
              <Text className="text-xs text-slate-400 mb-6">Pecahan rekod semasa</Text>
            </View>
            <View className="h-48 flex-row items-end justify-center space-x-8 px-4 mb-4">
              <View className="items-center space-y-2">
                <View className="w-12 h-16 bg-amber-500 rounded-t-md" />
                <Text className="text-xxs text-slate-500 font-medium">Draf</Text>
              </View>
              <View className="items-center space-y-2">
                <View className="w-12 h-36 bg-blue-900 rounded-t-md" />
                <Text className="text-xxs text-slate-500 font-medium">Siap</Text>
              </View>
            </View>
          </Panel>

          {/* Meeting Feed */}
          <Panel className="flex-[2] justify-between">
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-base font-bold text-slate-900 mb-1">Mesyuarat Terbaru</Text>
                  <Text className="text-xs text-slate-400">Senarai mesyuarat terkini</Text>
                </View>
                <TouchableOpacity 
                  className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200"
                  onPress={onNavigateToList}
                >
                  <Text className="text-xs font-semibold text-slate-600">Lihat Semua</Text>
                </TouchableOpacity>
              </View>

              {meetings.length === 0 ? (
                <View className="flex-1 justify-center items-center py-16">
                  <Text className="text-slate-400 text-center text-sm">
                    Tiada rekod mesyuarat ditemui. Klik butang tambah di bawah untuk bermula.
                  </Text>
                </View>
              ) : (
                <View className="max-h-[420px]">
                  <FlatList
                    data={meetings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <MeetingListItem meeting={item} onPress={() => onSelectMeeting(item)} />
                    )}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 420 }}
                    nestedScrollEnabled
                  />
                </View>
              )}
            </View>

            <View className="hidden md:flex mt-6 pt-2">
              <ActionButton title="+ Sediakan Rekod Mesyuarat Baharu" onPress={onNavigateToSetup} />
            </View>
          </Panel>
        </View>
      </PageContainer>
    </AppLayout>
  );
};

export default DashboardScreen;
