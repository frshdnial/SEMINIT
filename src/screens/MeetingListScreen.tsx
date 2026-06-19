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
    onNavigateToList: () => void;
    onBack: () => void;
}

export const MeetingListScreen: React.FC<MeetingListScreenProps> = ({
    meetings,
    onNavigateToSetup,
    onNavigateToList,
    onBack
}) => {
    const [search, setSearch] = useState("");
    const filteredMeetings = meetings.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()));

    //render the UI for the Meeting list screen
    return (
        <AppLayout onNavigateToSetup={onNavigateToSetup} onNavigateToList={onNavigateToList}>
            <SafeAreaView className="flex-1 bg-gray-50">
                <PageContainer>

                    <TouchableOpacity onPress={onBack} className="mb-4 py-1">
                        <Text className="text-blue-900 font-bold text-sm">← KEMBALI</Text>
                    </TouchableOpacity>

                    <Panel className="w-full p-6 flex-1 justify-between min-h-[75vh]">
                        <View className="flex-1 w-full">
                            <View className="flex-row justify-between items-center mb-6 w-full">
                                <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                                    Senarai Meeting
                                </Text>
                            </View>

                            <View className="flex-row items-center gap-2 px-3 py-2 border border-slate-200 rounded-md bg-white mb-6 w-full">
                                <Text className="text-gray-500 select-none">🔎</Text>

                                <View className="flex-1">
                                    <CustomInput
                                        label=""
                                        placeholder="Cari tajuk mesyuarat ..."
                                        className="w-full bg-transparent p-0 border-none outline-none"
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>
                            </View>

                            <View className="flex-1 w-full">
                                {meetings.length === 0 ? (
                                    <View className="flex-1 justify-center items-center py-16">
                                        <Text className="text-slate-400 text-center text-sm">
                                            Tiada rekod mesyuarat ditemui.
                                        </Text>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={filteredMeetings}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <View className="border-b border-slate-100 py-1">
                                                <MeetingListItem meeting={item} onPress={() => console.log("Pressed:", item.id)} />
                                            </View>
                                        )}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )}
                            </View>
                        </View>

                        <View className="mt-6 pt-4 border-t border-slate-100 w-full">
                            <TouchableOpacity onPress={onNavigateToSetup} className="flex items-center h-12 bg-blue-900 rounded-xl justify-center ml-3 mr-3 mb-5">
                                <Text className="font-medium text-white">
                                    + Mesyuarat Baru
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </Panel>
                </PageContainer>
            </SafeAreaView>
        </AppLayout>
    );
};
