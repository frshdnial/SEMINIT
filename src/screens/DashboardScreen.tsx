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

  // Scale each bar's height proportionally to a rounded-up axis maximum, so
  // the chart is a real, live representation of the data above it — not a
  // fixed mockup — and the y-axis reads as a clean, evenly-spaced scale.
  const CHART_MAX_HEIGHT = 140; // px, matches the plot area height below
  const CHART_MIN_HEIGHT = 4; // px, floor for a zero-count bar (flat baseline)
  const largestCount = Math.max(processingMeetings, completedMeetings, 1);
  // Round the axis ceiling up to a "nice" number (next multiple of 5, or of
  // 1 for very small counts) so the tick labels aren't an odd number like 7.
  const axisStep = largestCount <= 5 ? 1 : 5;
  const axisMax = Math.ceil(largestCount / axisStep) * axisStep;
  const pendingAudioBarHeight = processingMeetings > 0
    ? Math.max((processingMeetings / axisMax) * CHART_MAX_HEIGHT, 6)
    : CHART_MIN_HEIGHT;
  const completedBarHeight = completedMeetings > 0
    ? Math.max((completedMeetings / axisMax) * CHART_MAX_HEIGHT, 6)
    : CHART_MIN_HEIGHT;

  // Both dashboard panels share this exact height. Status Analisis's content
  // naturally fits within it; Mesyuarat Terbaru's meeting list scrolls
  // internally (via flex-1 below) instead of growing the card taller.
  const DASHBOARD_PANEL_HEIGHT = 480; // px

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

        <View className="flex-1 flex-col lg:flex-row gap-6 items-start w-full">
          {/* Chart Graphic Area */}
          <Panel className="flex-1 lg:max-w-xs" style={{ height: DASHBOARD_PANEL_HEIGHT }}>
            <View>
              <Text className="text-base font-bold text-slate-900 mb-1">Status Analisis</Text>
              <Text className="text-xs text-slate-400 mb-6">Pecahan rekod semasa</Text>
            </View>

            {/* Chart block sits directly below the header — the panel now
                sizes to its own content instead of stretching to match the
                meeting list panel beside it, so no extra centering is needed. */}
            <View>
              <View className="flex-row" style={{ height: CHART_MAX_HEIGHT }}>
                {/* Y-axis scale */}
                <View className="justify-between items-end pr-2 w-6" style={{ height: CHART_MAX_HEIGHT }}>
                  <Text className="text-[10px] text-slate-400 font-medium">{axisMax}</Text>
                  <Text className="text-[10px] text-slate-400 font-medium">{Math.round(axisMax / 2)}</Text>
                  <Text className="text-[10px] text-slate-400 font-medium">0</Text>
                </View>

                {/* Plot area: bars anchored to the bottom by normal flow
                    (items-end), bounded by a top gridline and a bottom
                    baseline border — no absolute positioning, so it can't
                    escape its container on any screen size or browser. */}
                <View
                  className="flex-1 flex-row items-end justify-center space-x-10 border-t border-slate-100"
                  style={{ height: CHART_MAX_HEIGHT, borderBottomWidth: 2, borderBottomColor: '#cbd5e1' }}
                >
                  <View
                    className="w-10 bg-amber-500 rounded-t-md"
                    style={{ height: pendingAudioBarHeight }}
                  />
                  <View
                    className="w-10 bg-emerald-500 rounded-t-md"
                    style={{ height: completedBarHeight }}
                  />
                </View>
              </View>

              {/* X-axis category labels, offset to line up under the plot area */}
              <View className="flex-row justify-center space-x-6 mt-2 pl-8">
                <Text className="text-xxs text-slate-500 font-medium w-20 text-center">Pending Audio</Text>
                <Text className="text-xxs text-slate-500 font-medium w-20 text-center">Completed</Text>
              </View>

              {/* Legend with the exact counts, so the numbers are still verifiable against the stat cards above */}
              <View className="flex-row justify-center items-center gap-4 mt-4 pt-3 border-t border-slate-100">
                <View className="flex-row items-center gap-1.5">
                  <View className="w-2 h-2 rounded-full bg-amber-500" />
                  <Text className="text-xxs text-slate-500">{processingMeetings} Pending</Text>
                </View>
                <View className="flex-row items-center gap-1.5">
                  <View className="w-2 h-2 rounded-full bg-emerald-500" />
                  <Text className="text-xxs text-slate-500">{completedMeetings} Completed</Text>
                </View>
              </View>
            </View>
          </Panel>

          {/* Meeting Feed */}
          <Panel className="flex-[2] justify-between" style={{ height: DASHBOARD_PANEL_HEIGHT }}>
            <View className="flex-1" style={{ minHeight: 0 }}>
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
                <FlatList
                  data={meetings}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <MeetingListItem meeting={item} onPress={() => onSelectMeeting(item)} />
                  )}
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}
                  nestedScrollEnabled
                />
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
