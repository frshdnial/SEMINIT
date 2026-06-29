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
    onBack: () => void;
    onSelectMeeting: (meeting: Meeting) => void;
}

export const MeetingListScreen: React.FC<MeetingListScreenProps> = ({
    meetings,
    onNavigateToSetup,
    NavigateToViewMeetings,
    onBack
}) => {
    const [search, setSearch] = useState("");
    const filteredMeetings = meetings.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()));

    return (
            <AppLayout onNavigateToSetup={onNavigateToSetup} onNavigateToList={NavigateToViewMeetings} activeRoute={"CreateMeeting"}>
            <SafeAreaView className="flex-1 bg-gray-50">
                <PageContainer>
                    <TouchableOpacity onPress={onBack} className="mb-4 py-1">
                        <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
                    </TouchableOpacity>

                    <Panel className="w-full p-6 flex-1 justify-between min-h-[75vh]">
                        <View className="flex-1 w-full">
                            <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                                Senarai Semua Mesyuarat
                            </Text>

                            <View className="flex-row items-center gap-2 px-3 border border-slate-200 rounded-xl bg-white mb-6 w-full">
                                <Text className="text-gray-500">🔎</Text>
                                <View className="flex-1">
                                    <CustomInput
                                        label=""
                                        placeholder="Cari tajuk mesyuarat..."
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>
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
                                                <MeetingListItem meeting={item} onPress={() => NavigateToViewMeetings} />
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
