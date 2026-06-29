import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
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
  onNavigateToDashboard: () => void;
  onNavigateToList: () => void;      
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

  // State Input Masa Mula (Format 12-Jam)
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>('AM');

  // State Input Masa Tamat (Format 12-Jam)
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>('PM');

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

  // Memastikan format input jam adalah antara 1-12 sahaja
  const handleHourChange = (val: string, setter: (v: string) => void) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean === '' || (parseInt(clean) >= 1 && parseInt(clean) <= 12)) {
      setter(clean.slice(0, 2));
    }
  };

  // Memastikan format input minit adalah antara 0-59 sahaja
  const handleMinuteChange = (val: string, setter: (v: string) => void) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean === '' || (parseInt(clean) >= 0 && parseInt(clean) <= 59)) {
      setter(clean.slice(0, 2));
    }
  };

  const handleFormSubmission = () => {
    const finalName = name.trim() || 'Mesyuarat Cadangan Projek Seminit';
    const finalDate = date || new Date().toISOString().split('T')[0];
    const finalLocation = location.trim() || 'Bilik Mesyuarat Utama, Aras 3';

    // Mencantumkan pecahan nilai masa menjadi format standard "HH:MM AM/PM"
    const formattedStart = startHour && startMinute 
      ? `${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')} ${startPeriod}`
      : '09:30 AM';

    const formattedEnd = endHour && endMinute 
      ? `${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')} ${endPeriod}`
      : '11:00 AM';

    const participantsString = participantList.length > 0 
      ? participantList.join(', ') 
      : 'Hafiz, Farish, Jeremy, Hurin';

    const constructedPayload: Meeting = {
      id: Date.now().toString(),
      name: finalName,
      location: finalLocation,
      participants: participantsString,
      date: finalDate,
      startTime: formattedStart,
      endTime: formattedEnd,
      status: 'Pending Audio',
      transcript: '', 
      summary: '',    
    };

    onSaveMeeting(constructedPayload);
  };

  return (
    <AppLayout
      activeRoute="CreateMeeting"
      onNavigateToSetup={() => {}} 
      onNavigateToList={onNavigateToList}           
      onNavigateToDashboard={onNavigateToDashboard} 
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
                      className="h-12 px-4 border border-slate-300 rounded-xl bg-white w-full text-slate-900 text-sm focus:outline-none"
                    />
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="h-12 px-4 border border-slate-300 rounded-xl bg-white flex-row items-center"
                      >
                        <Calendar size={18} color="#64748B" />
                        <Text className={`ml-3 text-sm ${date ? 'text-slate-900' : 'text-slate-400'}`}>
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

              {/* Bahagian Input Masa 12-Jam (Fixed Grid & Layout Placement) */}
              <View className="flex-row gap-6 mt-6">
                
                {/* Masa Mula */}
                <View className="flex-1">
                  <Text className="text-sm font-medium text-slate-700 mb-2">Masa Mula *</Text>
                  <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 h-12 justify-between">
                    <View className="flex-row items-center flex-1">
                      <TextInput
                        placeholder="09"
                        placeholderTextColor="#94A3B8"
                        value={startHour}
                        onChangeText={(val) => handleHourChange(val, setStartHour)}
                        keyboardType="number-pad"
                        maxLength={2}
                        style={{ padding: 0 }}
                        className="w-8 text-center font-normal text-slate-800 text-sm"
                      />
                      <Text className="text-slate-400 font-medium px-1 text-sm">:</Text>
                      <TextInput
                        placeholder="30"
                        placeholderTextColor="#94A3B8"
                        value={startMinute}
                        onChangeText={(val) => handleMinuteChange(val, setStartMinute)}
                        keyboardType="number-pad"
                        maxLength={2}
                        style={{ padding: 0 }}
                        className="w-8 text-center font-normal text-slate-800 text-sm"
                      />
                    </View>
                    
                    <View className="w-[1px] h-5 bg-slate-200 mx-3" />

                    <View className="flex-row bg-slate-100 p-0.5 rounded-lg items-center">
                      <TouchableOpacity
                        onPress={() => setStartPeriod('AM')}
                        className={`px-3 py-1 justify-center rounded-md ${startPeriod === 'AM' ? 'bg-white shadow-sm' : ''}`}
                      >
                        <Text className={`text-xs font-bold ${startPeriod === 'AM' ? 'text-blue-900' : 'text-slate-400'}`}>AM</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setStartPeriod('PM')}
                        className={`px-3 py-1 justify-center rounded-md ${startPeriod === 'PM' ? 'bg-white shadow-sm' : ''}`}
                      >
                        <Text className={`text-xs font-bold ${startPeriod === 'PM' ? 'text-blue-900' : 'text-slate-400'}`}>PM</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Masa Tamat */}
                <View className="flex-1">
                  <Text className="text-sm font-medium text-slate-700 mb-2">Masa Tamat *</Text>
                  <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 h-12 justify-between">
                    <View className="flex-row items-center flex-1">
                      <TextInput
                        placeholder="11"
                        placeholderTextColor="#94A3B8"
                        value={endHour}
                        onChangeText={(val) => handleHourChange(val, setEndHour)}
                        keyboardType="number-pad"
                        maxLength={2}
                        style={{ padding: 0 }}
                        className="w-8 text-center font-normal text-slate-800 text-sm"
                      />
                      <Text className="text-slate-400 font-medium px-1 text-sm">:</Text>
                      <TextInput
                        placeholder="00"
                        placeholderTextColor="#94A3B8"
                        value={endMinute}
                        onChangeText={(val) => handleMinuteChange(val, setEndMinute)}
                        keyboardType="number-pad"
                        maxLength={2}
                        style={{ padding: 0 }}
                        className="w-8 text-center font-normal text-slate-800 text-sm"
                      />
                    </View>
                    
                    <View className="w-[1px] h-5 bg-slate-200 mx-3" />

                    <View className="flex-row bg-slate-100 p-0.5 rounded-lg items-center">
                      <TouchableOpacity
                        onPress={() => setEndPeriod('AM')}
                        className={`px-3 py-1 justify-center rounded-md ${endPeriod === 'AM' ? 'bg-white shadow-sm' : ''}`}
                      >
                        <Text className={`text-xs font-bold ${endPeriod === 'AM' ? 'text-blue-900' : 'text-slate-400'}`}>AM</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setEndPeriod('PM')}
                        className={`px-3 py-1 justify-center rounded-md ${endPeriod === 'PM' ? 'bg-white shadow-sm' : ''}`}
                      >
                        <Text className={`text-xs font-bold ${endPeriod === 'PM' ? 'text-blue-900' : 'text-slate-400'}`}>PM</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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