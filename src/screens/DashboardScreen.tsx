import React from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { MeetingListItem } from '../components/MeetingListItem';
import { Meeting } from '../types';

interface DashboardScreenProps {
  meetings: Meeting[];
  onNavigateToSetup: () => void;
  onSelectMeeting: (meeting: Meeting) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ 
  meetings, 
  onNavigateToSetup, 
  onSelectMeeting 
}) => {
  
  // Dynamic metric logic calculations
  const totalMeetings = meetings.length;
  const completedMeetings = meetings.filter(m => m.status === 'Completed').length;
  const processingMeetings = meetings.filter(m => m.status === 'Processing' || m.status === 'Pending Audio').length;
  
  return (
    <View className="flex-1 flex-col md:flex-row bg-[#F8FAFC]">
      
      {/* ================= SIDEBAR NAVIGATION ================= */}
      <View className="hidden md:flex w-64 bg-slate-900 p-6 justify-between border-r border-slate-800">
        <View>
          {/* Header/Logo */}
          <View className="mb-8 flex-row items-center space-x-3">
            <View className="w-8 h-8 bg-amber-500 rounded-lg justify-center items-center">
              <Text className="text-white font-black text-xs">M</Text>
            </View>
            <View>
              <Text className="text-white font-bold text-base tracking-wide">Sistem Minit AI</Text>
              <Text className="text-slate-400 text-xxs font-medium uppercase tracking-tight">Majlis Daerah Kulai</Text>
            </View>
          </View>

          {/* Navigation Links */}
          <View className="space-y-2">
            <TouchableOpacity className="flex-row items-center bg-[#334155] px-4 py-3 rounded-xl">
              <Text className="text-white font-semibold text-sm">Papan Pemuka</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center px-4 py-3 rounded-xl hover:bg-slate-800">
              <Text className="text-slate-400 font-medium text-sm">Senarai Mesyuarat</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-row items-center px-4 py-3 rounded-xl hover:bg-[#334155]"
              onPress={onNavigateToSetup}
            >
              <Text className="text-slate-400 font-medium text-sm">Mesyuarat Baharu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Footer Profile */}
        <View className="flex-row items-center space-x-3 border-t border-slate-800 pt-4">
          <View className="w-10 h-10 bg-amber-500/20 rounded-full justify-center items-center">
            <Text className="text-amber-500 font-bold text-xs">PO</Text>
          </View>
          <View>
            <Text className="text-white font-semibold text-xs">Pegawai Operasi</Text>
            <Text className="text-slate-500 text-xxs">ID: MDK-8821</Text>
          </View>
        </View>
      </View>

      {/* ================= MAIN CONTENT WINDOW (SCROLLABLE & CENTERED) ================= */}
      <SafeAreaView className="flex-1">
        {/* Outer centering wrapper wrapper: mx-auto pulls it to the center, max-w-7xl caps the width */}
        <View className="flex-1 w-full mx-auto max-w-7xl p-8">
          
          {/* Top Segment Greeting */}
          <View className="mb-6 flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-slate-900 tracking-tight">Papan Pemuka</Text>
            <View className="md:hidden">
              <ActionButton title="+ Baru" onPress={onNavigateToSetup} />
            </View>
          </View>

          {/* ================= ROW: METRIC STATISTICS CARDS ================= */}
          <View className="flex-row flex-wrap gap-6 mb-8">
            
            {/* Card 1: Total Meetings */}
            <View className="flex-1 min-w-[240px] bg-white p-6 rounded-xl border border-slate-200">
              <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Jumlah Mesyuarat</Text>
              <Text className="text-3xl font-black text-slate-800">{totalMeetings || 5}</Text>
            </View>

            {/* Card 2: Completed Minutes */}
            <View className="flex-1 min-w-[240px] bg-white p-6 rounded-xl border border-slate-200">
              <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Minit Siap</Text>
              <Text className="text-3xl font-black text-slate-800">{completedMeetings || 2}</Text>
            </View>

            {/* Card 3: Action Required / Processing */}
            <View className="flex-1 min-w-[240px] bg-white p-6 rounded-xl border border-slate-200">
              <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tindakan Susulan</Text>
              <Text className="text-3xl font-black text-slate-800">{processingMeetings || 3}</Text>
            </View>

            {/* Card 4: Hours Saved */}
            <View className="flex-1 min-w-[240px] bg-white p-6 rounded-xl border border-slate-200">
              <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Jam Dijimatkan</Text>
              <View className="flex-row items-baseline space-x-1">
                <Text className="text-3xl font-black text-blue-600">12</Text>
                <Text className="text-sm font-medium text-blue-600">jam</Text>
              </View>
            </View>
            
          </View>

          {/* ================= LOWER SUB-GRID PANELS ================= */}
          <View className="flex-row flex-wrap gap-6 w-full">
            
            {/* Left Sub-Panel: Analytical Graph */}
            <View className="w-full lg:w-[32%] bg-white p-6 rounded-2xl border border-slate-200">
              <View>
                <Text className="text-base font-bold text-slate-900 mb-1">Status Mesyuarat</Text>
                <Text className="text-xs text-slate-400 mb-6">Pecahan mengikut status terkini</Text>
              </View>
              
              {/* Centered visual placeholder bar chart */}
              <View className="h-64 flex-row items-end justify-center">
                <View className="items-center space-y-2">
                  <View className="w-12 h-16 bg-amber-500 rounded-t-md" />
                  <Text className="text-xxs text-slate-500 font-medium">Draf</Text>
                </View>
                <View className="items-center space-y-2">
                  <View className="w-12 h-36 bg-slate-700 rounded-t-md" />
                  <Text className="text-xxs text-slate-500 font-medium">Siap</Text>
                </View>
              </View>
            </View>

            {/* Right Sub-Panel: Dynamic Meeting Feed */}
            <View className="flex-[2] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 justify-between">
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <Text className="text-base font-bold text-slate-900 mb-1">Mesyuarat Terbaru</Text>
                    <Text className="text-xs text-slate-400">Senarai mesyuarat terakhir diwujudkan</Text>
                  </View>
                  <TouchableOpacity className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                    <Text className="text-xs font-semibold text-slate-600">Lihat Semua</Text>
                  </TouchableOpacity>
                </View>

                {meetings.length === 0 ? (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-base font-medium text-slate-700 mb-2">
                      Belum ada mesyuarat
                    </Text>

                    <Text className="text-sm text-slate-500 text-center">
                      Mulakan dengan menambah mesyuarat baharu.
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
                  />
                )}
              </View>
              
              {/* Desktop Quick Action Trigger Footer */}
              <View className="hidden md:flex mt-6 pt-2">
                <ActionButton title="+ Sediakan Rekod Mesyuarat Baharu" onPress={onNavigateToSetup} />
              </View>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};