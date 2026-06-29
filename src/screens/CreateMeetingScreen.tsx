import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';

import { ActionButton } from '../components/ActionButton';
import { CustomInput } from '../components/CustomInput';
import { AppLayout } from '../components/layout/AppLayout';
import { PageContainer } from '../components/ui/PageContainer';

import { Meeting } from '../types';

interface CreateMeetingScreenProps {
  onSaveMeeting: (meeting: Meeting) => void;
  onBack: () => void;
}

export const CreateMeetingScreen: React.FC<CreateMeetingScreenProps> = ({
  onSaveMeeting,
  onBack,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [agenda, setAgenda] = useState('');

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (event: any, pickedDate?: Date) => {
    if (event.type === 'set' && pickedDate) {
      setSelectedDate(pickedDate);

      const formattedDate =
        pickedDate.getFullYear() +
        '-' +
        String(pickedDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(pickedDate.getDate()).padStart(2, '0');

      setDate(formattedDate);
    }
    setShowDatePicker(false);
  };

  const handleFormSubmission = () => {
    if (!name || !location || !date || !startTime || !endTime) {
      Alert.alert('Validation Error', 'Please complete all required fields.');
      return;
    }

    const constructedPayload: Meeting = {
      id: Date.now().toString(),
      name,
      location,
      participants,
      date,
      startTime,
      endTime,
      status: 'Pending Audio',
    };

    onSaveMeeting(constructedPayload);
  };

  return (
    <AppLayout onNavigateToSetup={() => {}}>
      <PageContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Back Button */}
          <TouchableOpacity onPress={onBack} className="mb-4 py-1">
            <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
          </TouchableOpacity>

          {/* Main Card */}
          <View className="max-w-5xl w-full self-center bg-white rounded-3xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <View className="px-8 py-7 bg-slate-50 border-b border-slate-200">
              <Text className="text-3xl font-bold text-slate-900">Butiran Mesyuarat</Text>
              <Text className="text-slate-500 mt-2">
                Masukkan maklumat asas untuk mesyuarat baharu ini.
              </Text>
            </View>

            {/* Body */}
            <View className="p-8">
              {/* Meeting Title */}
              <CustomInput
                label="Tajuk Mesyuarat *"
                placeholder="Contoh: Mesyuarat Penuh Majlis Bil. 4/2026"
                value={name}
                onChangeText={setName}
              />

              {/* Date + Location */}
              <View className="flex-row gap-6 mt-6">
                {/* Date */}
                <View className="flex-1">
                  <Text className="text-sm font-medium text-slate-700 mb-2">Tarikh *</Text>

                  {Platform.OS === 'web' ? (
                    <input
                      type="date"
                      value={date}
                      onChange={(e: any) => setDate(e.target.value)}
                      className="h-12 px-4 border border-slate-300 rounded-xl bg-white"
                    />
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="h-12 px-4 border border-slate-300 rounded-xl bg-white flex-row items-center"
                      >
                        <Calendar size={18} color="#64748B" />
                        <Text className={`ml-3 ${date ? 'text-slate-900' : 'text-slate-400'}`}>
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
                    </>
                  )}
                </View>

                {/* Location */}
                <View className="flex-1">
                  <CustomInput
                    label="Lokasi *"
                    placeholder="Bilik Mesyuarat Utama"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
              </View>

              {/* Time Row */}
              <View className="flex-row gap-6 mt-6">
                <View className="flex-1">
                  <CustomInput
                    label="Masa Mula *"
                    placeholder="09:00"
                    value={startTime}
                    onChangeText={setStartTime}
                  />
                </View>
                <View className="flex-1">
                  <CustomInput
                    label="Masa Tamat *"
                    placeholder="11:00"
                    value={endTime}
                    onChangeText={setEndTime}
                  />
                </View>
              </View>

              {/* Participants */}
              <View className="mt-6">
                <Text className="text-sm font-medium text-slate-700 mb-2">Senarai Peserta *</Text>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <CustomInput
                      label=""
                      placeholder="Nama / Jawatan (Tekan Enter)"
                      value={participants}
                      onChangeText={setParticipants}
                    />
                  </View>
                  <TouchableOpacity className="h-12 px-6 bg-amber-500 rounded-xl justify-center">
                    <Text className="font-medium text-black">Tambah</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Agenda */}
              <View className="mt-6">
                <Text className="text-sm font-medium text-slate-700 mb-2">Agenda Mesyuarat *</Text>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <CustomInput
                      label=""
                      placeholder="Perkara agenda (Tekan Enter)"
                      value={agenda}
                      onChangeText={setAgenda}
                    />
                  </View>
                  <TouchableOpacity className="h-12 px-6 bg-amber-500 rounded-xl justify-center">
                    <Text className="font-medium text-black">Tambah</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View className="px-8 py-6 border-t border-slate-200 bg-slate-50">
              <View className="flex-row justify-end gap-4">
                <ActionButton
                  title="Batal"
                  variant="secondary"
                  fullWidth={false}
                  onPress={onBack}
                />
                <ActionButton
                  title="Simpan & Teruskan"
                  variant="primary"
                  fullWidth={false}
                  onPress={handleFormSubmission}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </AppLayout>
  );
};
