import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { Meeting } from '../types';

interface AudioUploadScreenProps {
  meeting: Meeting;
  onAudioProcessed: (id: string, transcript: string, summary: string) => void;
  onBack: () => void;
}

export const AudioUploadScreen: React.FC<AudioUploadScreenProps> = ({ meeting, onAudioProcessed, onBack }) => {
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [nlpEvaluating, setNlpEvaluating] = useState(false);

  const triggerMockFileSelection = () => {
    // High fidelity simulator mimicking picking an external storage object (.mp3)
    setAttachedFile({
      name: 'recorded_meeting_v1.mp3',
      size: '24.8 MB'
    });
  };

  const executeNlpEvaluationPipeline = () => {
    if (!attachedFile) {
      Alert.alert('Resource Empty', 'Please append a mock audio stream payload (.mp3) first.');
      return;
    }

    setNlpEvaluating(true);

    // Pipeline processing delay emulator simulation (3 seconds)
    setTimeout(() => {
      setNlpEvaluating(false);
      
      const generatedTranscript = 
        "[00:05] Farish: Let's initiate the design validation. I added the state models to the React architecture.\n" +
        "[00:42] Hafiz: Looks optimal. The processing threads hook cleanly into our Tailwind wrappers.\n" +
        "[01:15] Jeremy: Confirming backend paths are stubbed correctly for frontend data tracking.\n" +
        "[01:50] Hurin: High fidelity screens map seamlessly down to the runtime navigation elements.";
      
      const generatedSummary = 
        "Executive Summary Summary Framework:\n" +
        "• Core Objective Explored: Frontend system layout validation for Seminit.\n" +
        "• Strategic Decisions Reached:\n" +
        "  - Confirmed state pipelines use TypeScript `.tsx` layouts.\n" +
        "  - Applied styling parameters exclusively via Tailwind config extensions.";

      onAudioProcessed(meeting.id, generatedTranscript, generatedSummary);
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4 justify-between">
      <View>
        <TouchableOpacity onPress={onBack} className="mb-4 py-1">
          <Text className="text-blue-900 font-bold text-sm">← Back</Text>
        </TouchableOpacity>

        <Text className="text-2xl font-extrabold text-blue-950 mb-1">Audio Track Repository</Text>
        <Text className="text-gray-500 text-sm mb-6">Target Configuration Profile: {meeting.name}</Text>

        <TouchableOpacity 
          onPress={triggerMockFileSelection}
          className="border-2 border-dashed border-gray-300 bg-white rounded-2xl p-10 items-center justify-center my-4"
          activeOpacity={0.6}
        >
          <Text className="text-4xl mb-3">🎵</Text>
          <Text className="text-gray-800 font-bold text-base">
            {attachedFile ? attachedFile.name : 'Simulate MP3 Audio Input'}
          </Text>
          <Text className="text-gray-400 text-xs mt-1">
            {attachedFile ? attachedFile.size : 'Supported inputs: .mp3, .wav'}
          </Text>
        </TouchableOpacity>

        {nlpEvaluating && (
          <View className="bg-blue-50 p-4 rounded-xl items-center my-4 border border-blue-100">
            <ActivityIndicator size="small" color="#1E3A8A" className="mb-2" />
            <Text className="text-blue-950 font-semibold text-xs text-center">
              Running NLP Segmentation and Speech-to-Text Synthesizer Transformers...
            </Text>
          </View>
        )}
      </View>

      {!nlpEvaluating && (
        <View className="mb-2">
          <ActionButton 
            title="Execute NLP Parsing Engine" 
            onPress={executeNlpEvaluationPipeline} 
            variant="success"
          />
        </View>
      )}
    </SafeAreaView>
  );
};