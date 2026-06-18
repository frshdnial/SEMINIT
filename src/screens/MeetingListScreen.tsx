import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { ActionButton } from '../components/ActionButton';
import { CustomInput } from '../components/CustomInput';
import { MeetingListItem } from "../components/MeetingListItem";
import { Meeting } from "../types";

interface MeetingListScreenProps {
    meetings: Meeting[];
    onNavigateToSetup: () => void;
    onBack: () => void;
}

export const MeetingListScreen: React.FC<MeetingListScreenProps> = ({
    meetings,
    onNavigateToSetup,
    onBack
}) => {
    const [search, setSearch] = useState("");
    const filteredMeetings = meetings.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()));

    //render the UI for the Meeting list screen
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-4 space-y-4">
                <TouchableOpacity onPress={onBack} className="mb-4 py-1">
                    <Text className="text-blue-900 font-bold text-sm">← KEMBALI</Text>
                </TouchableOpacity>
                    <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                        Senarai Meeting
                    </Text>

                    <View className="flex-row items-center gap-2 px-3 py-2 border border-slate-200 rounded-md bg-white">
                        {/* Left Side: Magnifying Glass */}
                        <Text className="text-gray-500 select-none">🔎</Text>

                        {/* Right Side: Input filling up the remaining space */}
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


            </View>
            <View className="flex-1">
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
                            <MeetingListItem meeting={item} onPress={() => console.log("Pressed:", item.id)} />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                )}

                <View className="hidden md:flex mt-6 pt-2 ml-3 mr-3">
                    <ActionButton
                        title="+ Mesyuarat Baru"
                        onPress={onNavigateToSetup}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
