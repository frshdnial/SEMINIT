import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeetingSetup() {
  // 1. General Form Inputs & File Attachment States
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  // 2. Mode Toggle State (False = Interactive Form UI, True = Pure Typing)
  const [isManualMode, setIsManualMode] = useState(false);

  // 3. True Cross-Platform Calendar Overlay States
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [calendarDateDisplay, setCalendarDateDisplay] = useState('');

  // 4. Dropdown Choice Selection Time States
  const [startHour, setStartHour] = useState('10');
  const [startMinute, setStartMinute] = useState('00');
  const [startAmpm, setStartAmpm] = useState('AM');

  const [endHour, setEndHour] = useState('11');
  const [endMinute, setEndMinute] = useState('30');
  const [endAmpm, setEndAmpm] = useState('AM');

  // 5. Manual Mode Pure Text Box Typing States
  const [manualDate, setManualDate] = useState('');
  const [manualStartTime, setManualStartTime] = useState('');
  const [manualEndTime, setManualEndTime] = useState('');

  // Picker option helper generation arrays
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

  // Web-Safe Date Format Handler 
  const handleDayPress = (dayObj: { dateString: string; day: number; month: number; year: number }) => {
    setSelectedDateString(dayObj.dateString);
    
    // Map numerical month index directly to standard nomenclature
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[dayObj.month - 1];
    const structuredDayStr = String(dayObj.day).padStart(2, '0');

    // Compiles exactly to format needed: e.g., "13 June 2026"
    setCalendarDateDisplay(`${structuredDayStr} ${monthName} ${dayObj.year}`);
    setShowCalendar(false); // Instantly closes overlay window seamlessly
  };

  // MP3 audio picker processing engine
  const handlePickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAudioFile(result.assets[0]);
        Alert.alert('File Attached', `Selected audio stream: ${result.assets[0].name}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to scan document directories.');
    }
  };

  // State parameter payload validation
  const handleSubmitSetup = async () => {
  if (!title.trim()) {
    Alert.alert('Missing Title', 'Please assign a title to your meeting topic.');
    return;
  }

  if (!audioFile) {
    Alert.alert('Audio Stream Needed', 'Please upload an MP3 file.');
    return;
  }

  let finalDate = '';
  let finalStartTime = '';
  let finalEndTime = '';

  if (isManualMode) {
    if (!manualDate.trim() || !manualStartTime.trim() || !manualEndTime.trim()) {
      Alert.alert('Missing Fields');
      return;
    }

    finalDate = manualDate;
    finalStartTime = manualStartTime;
    finalEndTime = manualEndTime;
  } else {
    if (!calendarDateDisplay) {
      Alert.alert('Missing Date');
      return;
    }

    finalDate = calendarDateDisplay;
    finalStartTime = `${startHour}:${startMinute} ${startAmpm}`;
    finalEndTime = `${endHour}:${endMinute} ${endAmpm}`;
  }

  const newMeeting = {
    id: Date.now().toString(),
    title,
    date: finalDate,
    duration: `${finalStartTime} - ${finalEndTime}`,
    location,
    description,
  };

  try {
    const existing = await AsyncStorage.getItem('meetings');
    const meetings = existing ? JSON.parse(existing) : [];

    meetings.unshift(newMeeting);

    await AsyncStorage.setItem(
      'meetings',
      JSON.stringify(meetings)
    );

    router.replace('/(tabs)');
  } catch (error) {
    Alert.alert('Error', 'Unable to save meeting.');
  }
};

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 24 }}>
      <Text className="text-royal-blue-dark text-xl font-bold mb-2">Configure Session Metadata</Text>

      {/* Manual Switching Mode Control Trigger Toggle */}
      <View className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl p-3 mb-5 shadow-xs">
        <View>
          <Text className="text-gray-800 font-semibold text-sm">Manual Mode Input</Text>
          <Text className="text-gray-500 text-xs">Switch to type text parameters directly</Text>
        </View>
        <Switch
          value={isManualMode}
          onValueChange={(value) => setIsManualMode(value)}
          trackColor={{ false: '#e5e7eb', true: '#D4AF37' }}
          thumbColor={isManualMode ? '#4169E1' : '#f4f3f4'}
        />
      </View>

      {/* Meeting Title Field */}
      <View className="mb-4">
        <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Meeting Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Application Development Review"
          className="w-full bg-white border border-gray-300 p-3.5 rounded-xl text-gray-900 focus:border-royal-blue"
        />
      </View>

      {/* --- DATE INPUT INTERACTIVE ZONE --- */}
      <View className="mb-4">
        <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Date</Text>
        {isManualMode ? (
          <TextInput
            value={manualDate}
            onChangeText={setManualDate}
            placeholder="e.g., 13 June 2026"
            className="w-full bg-white border border-gray-300 p-3.5 rounded-xl text-gray-900 focus:border-royal-blue"
          />
        ) : (
          /* Clickable Input Trigger Box */
          <TouchableOpacity
            onPress={() => setShowCalendar(true)}
            activeOpacity={0.7}
            className="w-full bg-white border border-gray-300 p-3.5 rounded-xl flex-row justify-between items-center"
          >
            <Text className={`text-base ${calendarDateDisplay ? "text-gray-900" : "text-gray-400"}`}>
              {calendarDateDisplay || "Select meeting date..."}
            </Text>
            <Text className="text-gray-400 text-xs">▼</Text>
          </TouchableOpacity>
        )}

        {/* Universal Overlay Backdrop Modal Window Layer */}
        <Modal
          transparent={true}
          visible={!isManualMode && showCalendar}
          animationType="fade"
          onRequestClose={() => setShowCalendar(false)}
        >
          <TouchableOpacity 
            className="flex-1 bg-black/50 justify-center items-center p-4"
            activeOpacity={1}
            onPress={() => setShowCalendar(false)}
          >
            {/* Calendar Container Card with explicit sizing constraints for web safety */}
            <View 
              className="bg-white p-5 rounded-2xl w-full max-w-sm shadow-2xl" 
              style={{ minHeight: 380 }}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <Text className="text-gray-900 font-bold text-center text-lg mb-3">Pick a Date</Text>
              
              <Calendar
                current={'2026-06-13'} // Anchored explicitly to match project schema date timeline
                onDayPress={handleDayPress}
                markedDates={{
                  [selectedDateString]: { selected: true, selectedColor: '#4169E1' }
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#4b5563',
                  selectedDayBackgroundColor: '#4169E1',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#D4AF37',
                  dayTextColor: '#1f2937',
                  arrowColor: '#4169E1',
                  monthTextColor: '#111827',
                  textDayFontWeight: '500',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: 'bold',
                }}
              />

              <TouchableOpacity 
                onPress={() => setShowCalendar(false)}
                className="mt-4 bg-gray-200 py-2.5 rounded-xl items-center w-full"
              >
                <Text className="text-gray-700 font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* --- TIME FIELDS ZONE --- */}
      {isManualMode ? (
        /* Manual Time Form Boxes Row Input Styling */
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Start Time</Text>
            <TextInput
              value={manualStartTime}
              onChangeText={setManualStartTime}
              placeholder="e.g., 10:00 AM"
              className="w-full bg-white border border-gray-300 p-3.5 rounded-xl text-gray-900 focus:border-royal-blue"
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-gray-700 font-semibold mb-1.5 text-sm">End Time</Text>
            <TextInput
              value={manualEndTime}
              onChangeText={setManualEndTime}
              placeholder="e.g., 11:30 AM"
              className="w-full bg-white border border-gray-300 p-3.5 rounded-xl text-gray-900 focus:border-royal-blue"
            />
          </View>
        </View>
      ) : (
        /* Dropdown Selection Grid Layout Row */
        <View className="flex-row justify-between mb-4">
          {/* Start Time select selectors column */}
          <View className="flex-1 mr-2">
            <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Start Time</Text>
            <View className="flex-row bg-white border border-gray-300 rounded-xl overflow-hidden px-1">
              <Picker selectedValue={startHour} style={{ flex: 1, height: 50 }} onValueChange={setStartHour}>
                {hours.map((h) => <Picker.Item key={h} label={h} value={h} />)}
              </Picker>
              <Picker selectedValue={startMinute} style={{ flex: 1, height: 50 }} onValueChange={setStartMinute}>
                {minutes.map((m) => <Picker.Item key={m} label={m} value={m} />)}
              </Picker>
              <Picker selectedValue={startAmpm} style={{ flex: 1.2, height: 50 }} onValueChange={setStartAmpm}>
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>
          </View>

          {/* End Time select selectors column */}
          <View className="flex-1 ml-2">
            <Text className="text-gray-700 font-semibold mb-1.5 text-sm">End Time</Text>
            <View className="flex-row bg-white border border-gray-300 rounded-xl overflow-hidden px-1">
              <Picker selectedValue={endHour} style={{ flex: 1, height: 50 }} onValueChange={setEndHour}>
                {hours.map((h) => <Picker.Item key={h} label={h} value={h} />)}
              </Picker>
              <Picker selectedValue={endMinute} style={{ flex: 1, height: 50 }} onValueChange={setEndMinute}>
                {minutes.map((m) => <Picker.Item key={m} label={m} value={m} />)}
              </Picker>
              <Picker selectedValue={endAmpm} style={{ flex: 1.2, height: 50 }} onValueChange={setEndAmpm}>
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>
          </View>
        </View>
      )}

      {/* Location Input */}
      <View className="mb-4">
        <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="e.g., Meeting Room 1 / Teams"
          className="w-full bg-white border border-gray-300 p-3.5 rounded-xl text-gray-900 focus:border-royal-blue"
        />
      </View>

      {/* Description / Agenda Input */}
      <View className="mb-6">
        <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Description / Agenda</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Brief discussion goals outline..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          className="w-full bg-white border border-gray-300 p-3.5 rounded-xl text-gray-900 h-24 focus:border-royal-blue"
        />
      </View>

      {/* Audio upload stream picker container */}
      <Text className="text-gray-700 font-semibold mb-1.5 text-sm">Recording Audio File</Text>
      <TouchableOpacity
        onPress={handlePickAudio}
        className={`w-full py-6 rounded-2xl border-2 border-dashed items-center justify-center mb-8 ${
          audioFile ? 'bg-emerald-50 border-emerald-400' : 'bg-gold/5 border-gold'
        }`}
      >
        <Text className={`font-bold text-base ${audioFile ? 'text-emerald-700' : 'text-amber-800'}`}>
          {audioFile ? '🎵 MP3 Audio Attached Successfully' : '📥 Upload MP3 Meeting File'}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">
          {audioFile ? `${audioFile.name} (${(audioFile.size ? audioFile.size / 1024 / 1024 : 0).toFixed(2)} MB)` : 'Supports standard meeting audio captures'}
        </Text>
      </TouchableOpacity>

      {/* Form submit confirmation element */}
      <TouchableOpacity
        onPress={handleSubmitSetup}
        className="w-full bg-royal-blue py-4 rounded-xl items-center shadow-md active:opacity-90"
      >
        <Text className="text-white font-bold text-base">Generate Minutes & Logs</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}