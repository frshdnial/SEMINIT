import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

// Mengimport fail seminit-logo.png terus dari direktori root projek anda
const SeminitLogo = require('../../../seminit-logo.png');

interface SidebarProps {
  activeRoute: string;
  onNavigateToSetup: () => void;
  onNavigateToList: () => void;
  onNavigateToDashboard?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeRoute,
  onNavigateToSetup,
  onNavigateToList,
  onNavigateToDashboard = () => {},
}) => {
  return (
    <View className="hidden md:flex w-64 bg-[#1E293B] p-6 h-full flex-col justify-between border-r border-slate-800">
      <View>
        {/* Logo Section - Menggunakan items-start untuk sejajar dari atas teks */}
        <View className="mb-8 flex-row items-start space-x-3">
          {/* Saiz dibesarkan kepada 44px supaya ketinggiannya sama rata dengan 2 baris teks */}
          <Image 
            source={SeminitLogo} 
            style={{ width: 44, height: 44, resizeMode: 'contain' }}
          />

          <View className="justify-center">
            <Text className="text-white font-bold text-base tracking-wide leading-tight">
              SEMINIT
            </Text>
            <Text className="text-slate-400 text-xxs font-medium uppercase tracking-tight mt-0.5 leading-normal">
              Pejabat Daerah Kulai
            </Text>
          </View>
        </View>

        {/* Navigation */}
        <View className="space-y-2">
          {/* Dashboard */}
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 rounded-xl ${
              activeRoute === 'Dashboard' ? 'bg-[#334155]' : ''
            }`}
            onPress={onNavigateToDashboard}
          >
            <Text
              className={`font-semibold text-sm ${
                activeRoute === 'Dashboard' ? 'text-white' : 'text-slate-400'
              }`}
            >
              Papan Pemuka
            </Text>
          </TouchableOpacity>

          {/* Meeting List */}
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 rounded-xl ${
              activeRoute === 'MeetingList' ? 'bg-[#334155]' : ''
            }`}
            onPress={onNavigateToList}
          >
            <Text
              className={`font-semibold text-sm ${
                activeRoute === 'MeetingList' ? 'text-white' : 'text-slate-400'
              }`}
            >
              Senarai Mesyuarat
            </Text>
          </TouchableOpacity>

          {/* Create Meeting */}
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 rounded-xl ${
              activeRoute === 'CreateMeeting' ? 'bg-[#334155]' : ''
            }`}
            onPress={onNavigateToSetup}
          >
            <Text
              className={`font-semibold text-sm ${
                activeRoute === 'CreateMeeting' ? 'text-white' : 'text-slate-400'
              }`}
            >
              Mesyuarat Baharu
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
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
  );
};