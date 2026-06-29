import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, X } from 'lucide-react-native';

import { CustomInput } from '../components/CustomInput';
import { AppLayout } from '../components/layout/AppLayout';
import { PageContainer } from '../components/ui/PageContainer';

import { Meeting } from '../types';

interface CreateMeetingScreenProps {
  onSaveMeeting: (meeting: Meeting) => void;
  onBack: () => void;
  onNavigateToDashboard: () => void; // Added for sidebar
  onNavigateToList: () => void;      // Added for sidebar
}

export const CreateMeetingScreen: React.FC<CreateMeetingScreenProps> = ({
  onSaveMeeting,
  onBack,
  onNavigateToDashboard,
  onNavigateToList,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  
  const [currentParticipant, setCurrentParticipant] = useState('');
  const [participantList, setParticipantList] = useState<string[]>([]);
  
  const [currentAgenda, setCurrentAgenda] = useState('');
  const [agendaList, setAgendaList] = useState<string[]>([]);

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

  const handleAddParticipant = () => {
    if (currentParticipant.trim()) {
      setParticipantList([...participantList, currentParticipant.trim()]);
      setCurrentParticipant('');
    }
  };

  const handleAddAgenda = () => {
    if (currentAgenda.trim()) {
      setAgendaList([...agendaList, currentAgenda.trim()]);
      setCurrentAgenda('');
    }
  };

  const handleFormSubmission = () => {
    const finalName = name.trim() || 'Mesyuarat Cadangan Projek Seminit';
    const finalDate = date || new Date().toISOString().split('T')[0];
    const finalLocation = location.trim() || 'Bilik Mesyuarat Utama, Aras 3';
    const finalStartTime = startTime.trim() || '09:30 AM';
    const finalEndTime = endTime.trim() || '11:00 AM';

    const participantsString = participantList.length > 0 
      ? participantList.join(', ') 
      : 'Hafiz, Farish, Jeremy, Hurin';

    const constructedPayload: Meeting = {
      id: Date.now().toString(),
      name: finalName,
      location: finalLocation,
      participants: participantsString,
      date: finalDate,
      startTime: finalStartTime,
      endTime: finalEndTime,
      status: 'Pending Audio',
      transcript: '', 
      summary: '',    
    };

    onSaveMeeting(constructedPayload);
  };

  return (
    <AppLayout
      activeRoute="CreateMeeting"
      onNavigateToSetup={() => {}} // Already on this screen
      onNavigateToList={onNavigateToList}           // Fixed callback
      onNavigateToDashboard={onNavigateToDashboard} // Fixed callback
    >
      <PageContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <TouchableOpacity onPress={onBack} className="mb-4 py-1">
            <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
          </TouchableOpacity>

          <View className="max-w-5xl w-full self-center bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <View className="px-8 py-7 bg-slate-50 border-b border-slate-200">
              <Text className="text-3xl font-bold text-slate-900">Butiran Mesyuarat</Text>
              <Text className="text-slate-500 mt-2">
                Masukkan maklumat asas untuk mesyuarat baharu ini.
              </Text>
            </View>

            <View className="p-8">
              <CustomInput
                label="Tajuk Mesyuarat *"
                placeholder="Contoh: Mesyuarat Penuh Majlis Bil. 4/2026"
                value={name}
                onChangeText={setName}
              />

              <View className="flex-row gap-6 mt-6">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-slate-700 mb-2">Tarikh *</Text>
                  {Platform.OS === 'web' ? (
                    <input
                      type="date"
                      value={date}
                      onChange={(e: any) => setDate(e.target.value)}
                      className="h-12 px-4 border border-slate-300 rounded-xl bg-white w-full text-slate-900"
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

                <View className="flex-1">
                  <CustomInput
                    label="Lokasi *"
                    placeholder="Bilik Mesyuarat Utama"
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
              </View>

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

              <View className="mt-6">
                <Text className="text-sm font-medium text-slate-700 mb-2">Senarai Peserta *</Text>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <CustomInput
                      label=""
                      placeholder="Nama / Jawatan (Tekan Enter)"
                      value={currentParticipant}
                      onChangeText={setCurrentParticipant}
                    />
                  </View>
                  <TouchableOpacity className="h-12 px-6 bg-amber-500 rounded-xl justify-center" onPress={handleAddParticipant}>
                    <Text className="font-medium text-black">Tambah</Text>
                  </TouchableOpacity>
                </View>
                
                {participantList.length > 0 && (
                  <View className="flex-row flex-wrap gap-2 mt-3">
                    {participantList.map((p, idx) => (
                      <View key={idx} className="flex-row items-center bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                        <Text className="text-sm text-slate-800 mr-1.5">{p}</Text>
                        <TouchableOpacity onPress={() => setParticipantList(participantList.filter((_, i) => i !== idx))}>
                          <X size={14} color="#64748B" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              <View className="mt-6">
                <Text className="text-sm font-medium text-slate-700 mb-2">Agenda Mesyuarat *</Text>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <CustomInput
                      label=""
                      placeholder="Perkara agenda (Tekan Enter)"
                      value={currentAgenda}
                      onChangeText={setCurrentAgenda}
                    />
                  </View>
                  <TouchableOpacity className="h-12 px-6 bg-amber-500 rounded-xl justify-center" onPress={handleAddAgenda}>
                    <Text className="font-medium text-black">Tambah</Text>
                  </TouchableOpacity>
                </View>

                {agendaList.length > 0 && (
                  <View className="mt-3 gap-y-2">
                    {agendaList.map((a, idx) => (
                      <View key={idx} className="flex-row items-center justify-between bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
                        <Text className="text-sm text-slate-800 flex-1">{idx + 1}. {a}</Text>
                        <TouchableOpacity onPress={() => setAgendaList(agendaList.filter((_, i) => i !== idx))}>
                          <X size={16} color="#64748B" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>

            <View className="px-8 py-6 border-t border-slate-200 bg-slate-50">
              <View className="flex-row justify-end gap-4">
                <TouchableOpacity 
                  className="h-12 px-6 bg-slate-200 rounded-xl justify-center active:opacity-80" 
                  onPress={onBack}
                >
                  <Text className="font-medium text-slate-700">Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="h-12 px-6 bg-blue-900 rounded-xl justify-center active:opacity-80" 
                  onPress={handleFormSubmission}
                >
                  <Text className="font-medium text-white">Simpan & Teruskan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </AppLayout>
  );
};

export default CreateMeetingScreen;