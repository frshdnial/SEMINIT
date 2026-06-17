import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { CustomInput } from '../components/CustomInput';
import { Meeting } from '../types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';

interface CreateMeetingScreenProps {
  onSaveMeeting: (meeting: Meeting) => void;
  onBack: () => void;
}

export const CreateMeetingScreen: React.FC<CreateMeetingScreenProps> = ({ onSaveMeeting, onBack }) => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (event: any, pickedDate?: Date) => {
  setShowDatePicker(false);

  if (pickedDate) {
    setSelectedDate(pickedDate);

    const formattedDate =
      pickedDate.getFullYear() +
      '-' +
      String(pickedDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(pickedDate.getDate()).padStart(2, '0');

    setDate(formattedDate);
  }
};

  const handleFormSubmission = () => {
    if (!name || !date || !startTime || !endTime) {
      Alert.alert('Validation Error', 'Please map constraints across Name, Date, and Timeline windows.');
      return;
    }

    const constructedPayload: Meeting = {
      id: Date.now().toString(),
      name,
      participants,
      date,
      startTime,
      endTime,
      status: 'Pending Audio'
    };

    onSaveMeeting(constructedPayload);
  };

  return (
  <SafeAreaView className="flex-1 bg-slate-100">
    <ScrollView contentContainerStyle={{ padding: 24 }}>

      <View className="max-w-5xl w-full self-center bg-white rounded-3xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <View className="px-8 py-7 bg-slate-50 border-b border-slate-200">
          <Text className="text-3xl font-bold text-slate-900">
            Butiran Mesyuarat
          </Text>

          <Text className="text-slate-500 mt-2">
            Masukkan maklumat asas untuk mesyuarat baharu ini.
          </Text>
        </View>

        {/* Body */}
        <View className="p-8">

          {/* Tajuk */}
          <CustomInput
            label="Tajuk Mesyuarat *"
            placeholder="Contoh: Mesyuarat Penuh Majlis Bil. 4/2026"
            value={name}
            onChangeText={setName}
          />

          {/* Row */}
          <View className="flex-row gap-6 mt-6">

            <View className="flex-1">

  <Text className="text-sm font-medium text-slate-700 mb-2">
    Tarikh *
  </Text>

  <TouchableOpacity
  onPress={() => setShowDatePicker(true)}
  className="
    h-12
    px-4
    border
    border-slate-300
    rounded-xl
    bg-white
    flex-row
    items-center
  "
>
  <Calendar
    size={18}
    color="#64748B"
  />

  <Text
    className={`ml-3 ${
      date ? 'text-slate-900' : 'text-slate-400'
    }`}
  >
    {date || 'Pilih tarikh'}
  </Text>
</TouchableOpacity>

  {showDatePicker && (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display="default"
      onChange={onDateChange}
    />
  )}

</View>

            <View className="flex-1">
              <CustomInput
                label="Lokasi *"
                placeholder="Bilik Mesyuarat Utama"
                value={participants}
                onChangeText={setParticipants}
              />
            </View>

          </View>

          {/* Participants */}
          <View className="mt-6">

            <Text className="text-sm font-medium text-slate-700 mb-2">
              Senarai Peserta *
            </Text>

            <View className="flex-row gap-3">

              <View className="flex-1">
                <CustomInput
                  label=""
                  placeholder="Nama / Jawatan (Tekan Enter)"
                  value={participants}
                  onChangeText={setParticipants}
                />
              </View>

              <TouchableOpacity
                className="h-12 px-6 bg-amber-500 rounded-xl justify-center"
              >
                <Text className="font-medium text-black">
                  Tambah
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Agenda */}
          <View className="mt-6">

            <Text className="text-sm font-medium text-slate-700 mb-2">
              Agenda Mesyuarat *
            </Text>

            <View className="flex-row gap-3">

              <View className="flex-1">
                <CustomInput
                  label=""
                  placeholder="Perkara agenda (Tekan Enter)"
                  value=""
                  onChangeText={() => {}}
                />
              </View>

              <TouchableOpacity
                className="h-12 px-6 bg-amber-500 rounded-xl justify-center"
              >
                <Text className="font-medium text-black">
                  Tambah
                </Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>

        {/* Footer */}
        <View className="px-8 py-6 border-t border-slate-200 bg-slate-50">

          <View className="flex-row justify-end gap-4">

            <TouchableOpacity
              onPress={onBack}
              className="px-6 py-3 rounded-xl border border-slate-300 bg-white"
            >
              <Text className="font-medium text-slate-700">
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleFormSubmission}
              className="px-8 py-3 rounded-xl bg-[#1E3A78]"
            >
              <Text className="font-semibold text-white">
                Simpan & Teruskan
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </ScrollView>
  </SafeAreaView>
);
};