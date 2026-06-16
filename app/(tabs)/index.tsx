import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  location?: string;
  description?: string;
  status?: "Draft" | "Processing" | "Completed";
}

export default function DashboardScreen() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadMeetings = async () => {
        try {
          const stored = await AsyncStorage.getItem("meetings");

          if (stored) {
            setMeetings(JSON.parse(stored));
          } else {
            setMeetings([]);
          }
        } catch (error) {
          console.log("Failed to load meetings:", error);
        }
      };

      loadMeetings();
    }, [])
  );

  const statistics = useMemo(() => {
    const totalMeetings = meetings.length;

    const completed = meetings.filter(
      (m) => m.status === "Completed"
    ).length;

    const processing = meetings.filter(
      (m) => m.status === "Processing"
    ).length;

    const draft = meetings.filter(
      (m) => m.status === "Draft" || !m.status
    ).length;

    // Example calculation
    const hoursSaved = totalMeetings * 2;

    return {
      totalMeetings,
      completed,
      processing,
      draft,
      hoursSaved,
    };
  }, [meetings]);

  return (
    <View className="flex-1 flex-row bg-gray-100">
      {/* SIDEBAR */}
      <View className="w-64 bg-white border-r border-gray-200 p-4">
        {/* Logo / Header */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-blue-900">
            SEMINIT
          </Text>

          <Text className="text-xs text-gray-500 mt-1">
            MAJLIS DAERAH KULAI
          </Text>
        </View>

        {/* Navigation */}
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="mb-4"
          >
            <Text className="text-pink-600 font-semibold">
              Dashboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/minutes")}
            className="mb-4"
          >
            <Text className="text-gray-700">
              Meeting List
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/meeting-setup")}
          >
            <Text className="text-gray-700">
              New Meeting
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="border-t border-gray-200 pt-4">
          <Text className="text-sm text-gray-600">
            Pegawai Operasi
          </Text>

          <Text className="text-xs text-gray-500 mt-1">
            ID: MDK-8821
          </Text>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <ScrollView className="flex-1 p-6">
        {/* Page Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold">
              Dashboard
            </Text>

            <Text className="text-gray-500 text-sm mt-1">
              Manage and monitor your meeting minutes
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/meeting-setup")}
            className="bg-blue-700 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium text-sm">
              + New Meeting
            </Text>
          </TouchableOpacity>
        </View>

        {/* Statistics Cards */}
        <View className="flex-row justify-between mb-6">
          {[
            {
              title: "Total Meetings",
              value: statistics.totalMeetings,
            },
            {
              title: "Completed Minutes",
              value: statistics.completed,
            },
            {
              title: "Processing",
              value: statistics.processing,
            },
            {
              title: "Hours Saved",
              value: `${statistics.hoursSaved} hrs`,
            },
          ].map((card, index) => (
            <View
              key={index}
              className="bg-white rounded-lg shadow p-4 w-[24%]"
            >
              <Text className="text-gray-500 text-sm">
                {card.title}
              </Text>

              <Text className="text-2xl font-bold mt-2">
                {card.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Bottom Section */}
        <View className="flex-row justify-between">
          {/* Meeting Status */}
          <View className="bg-white rounded-lg shadow p-5 w-[48%]">
            <Text className="text-lg font-semibold mb-4">
              Meeting Status
            </Text>

            <View>
              <View className="flex-row justify-between mb-3">
                <Text className="text-green-600">
                  ✅ Completed
                </Text>

                <Text className="font-semibold">
                  {statistics.completed}
                </Text>
              </View>

              <View className="flex-row justify-between mb-3">
                <Text className="text-yellow-600">
                  ⏳ Processing
                </Text>

                <Text className="font-semibold">
                  {statistics.processing}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray-600">
                  📝 Draft
                </Text>

                <Text className="font-semibold">
                  {statistics.draft}
                </Text>
              </View>
            </View>
          </View>

          {/* Recent Meetings */}
          <View className="bg-white rounded-lg shadow p-5 w-[48%]">
            <Text className="text-lg font-semibold mb-4">
              Recent Meetings
            </Text>

            {meetings.length === 0 ? (
              <Text className="text-gray-400">
                No meetings found.
              </Text>
            ) : (
              meetings
                .slice()
                .reverse()
                .slice(0, 5)
                .map((meeting) => (
                  <TouchableOpacity
                    key={meeting.id}
                    className="border-b border-gray-100 pb-3 mb-3"
                    onPress={() =>
                      router.push(`/minutes/${meeting.id}`)
                    }
                  >
                    <Text className="font-semibold">
                      {meeting.title}
                    </Text>

                    <Text className="text-sm text-gray-500 mt-1">
                      {meeting.date}
                    </Text>

                    {meeting.location && (
                      <Text className="text-sm text-gray-500">
                        {meeting.location}
                      </Text>
                    )}

                    <Text
                      className={`text-sm mt-1 ${
                        meeting.status === "Completed"
                          ? "text-green-600"
                          : meeting.status === "Processing"
                          ? "text-yellow-600"
                          : "text-gray-600"
                      }`}
                    >
                      {meeting.status || "Draft"}
                    </Text>
                  </TouchableOpacity>
                ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}