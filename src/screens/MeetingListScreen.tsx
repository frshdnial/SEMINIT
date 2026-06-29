import { AppLayout } from "@/components/layout/AppLayout";
import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { CustomInput } from '../components/CustomInput';
import { MeetingListItem } from "../components/MeetingListItem";
import { PageContainer } from "../components/ui/PageContainer";
import { Panel } from "../components/ui/Panel";
import { Meeting } from "../types";

interface MeetingListScreenProps {
  meetings: Meeting[];
  onNavigateToSetup: () => void;
  NavigateToViewMeetings: () => void;
  onNavigateToDashboard: () => void;
  onBack: () => void;
  onSelectMeeting: (meeting: Meeting) => void;
}

export const MeetingListScreen: React.FC<MeetingListScreenProps> = ({
  meetings,
  onNavigateToSetup,
  NavigateToViewMeetings,
  onNavigateToDashboard,
  onSelectMeeting,
}) => {
  const [search, setSearch] = useState("");
  const filteredMeetings = meetings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout 
      onNavigateToSetup={onNavigateToSetup} 
      onNavigateToList={NavigateToViewMeetings} 
      onNavigateToDashboard={onNavigateToDashboard}
      activeRoute={"MeetingList"}
    >
      <SafeAreaView className="flex-1 bg-gray-50">
        <PageContainer>
          <View className="mb-6 flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-slate-900 tracking-tight">
                Senarai Mesyuarat
              </Text>
              <Text className="text-slate-500 text-sm mt-1">
                Arkib pengurusan fail minit organisasi
              </Text>
            </View>
          </View>

          <Panel className="flex-1 items-start justify-start p-6">
            <View className="w-full flex-1">
              <View className="mb-4 w-full">
                <CustomInput
                  label=""
                  placeholder="Cari rekod mesyuarat..."
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              <View className="flex-1 w-full">
                {filteredMeetings.length === 0 ? (
                  <View className="flex-1 justify-center items-center py-16">
                    <Text className="text-slate-400 text-center text-sm">
                      Tiada rekod ditemui.
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={filteredMeetings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View className="border-b border-slate-100 py-1">
                        {/* 👈 UPDATED: Triggers core onSelectMeeting context router handler */}
                        <MeetingListItem meeting={item} onPress={() => onSelectMeeting(item)} />
                      </View>
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                )}
              </View>
            </View>

            <View className="mt-6 pt-4 border-t border-slate-100 w-full">
              <TouchableOpacity
                onPress={onNavigateToSetup}
                className="flex items-center h-12 bg-blue-900 rounded-xl justify-center"
              >
                <Text className="font-medium text-white">+ Bina Rekod Baru</Text>
              </TouchableOpacity>
            </View>
          </Panel>
        </PageContainer>
      </SafeAreaView>
    </AppLayout>
  );
};

export default MeetingListScreen;