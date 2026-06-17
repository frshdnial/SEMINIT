import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
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

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="p-4 space-y-4">
                <TouchableOpacity onPress={onBack} className="mb-4 py-1">
                    <Text className="text-blue-900 font-bold text-sm">← KEMBALI</Text>
                </TouchableOpacity>

                <Text className="text-2xl font-extrabold text-blue-950 mb-1">Senarai Meeting</Text>
                <CustomInput
                    label="Search Meeting"
                    placeholder="Cari tajuk mesyuarat ..."
                    className="pl-9 bg-card"
                    value={search}
                />
                <TouchableOpacity onPress={onNavigateToSetup}>
                    <Text className="mt-4">+ Mesyuarat Baharu</Text>
                </TouchableOpacity>
            </View>
            <FlatList>
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
                            <MeetingListItem meeting={item}/>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </FlatList>
        </SafeAreaView>
    );
};
