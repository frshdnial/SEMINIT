import React, { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface AudioUploadScreenProps {
  meeting: Meeting;
  onAudioProcessed: (
    id: string,
    transcript: string,
    summary: string
  ) => void;
  onBack: () => void;
}

export const AudioUploadScreen: React.FC<AudioUploadScreenProps> = ({
  meeting,
  onAudioProcessed,
  onBack,
}) => {
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const [nlpEvaluating, setNlpEvaluating] = useState(false);

  const triggerMockFileSelection = () => {
    setAttachedFile({
      name: 'rekod_mesyuarat_pentadbiran.mp3',
      size: '18.4 MB',
    });
  };

  const executeNlpEvaluationPipeline = () => {
    // Force set mock file to bypass any validation blocks
    setAttachedFile({
      name: 'rekod_mesyuarat_pentadbiran.mp3',
      size: '18.4 MB',
    });

    setNlpEvaluating(true);

    // Short processing delay for prototype feel
    setTimeout(() => {
      setNlpEvaluating(false);

      const generatedTranscript =
        "[00:12] Pengerusi: Assalamualaikum, mari kita mulakan perbincangan reka bentuk sistem Seminit.\n" +
        "[00:55] Hafiz: Integrasi framework Tailwind CSS versi web dan mobile kini berjalan lancar.\n" +
        "[01:40] Jeremy: Pautan mockup data flow skrin sedia dipadankan mengikut state aplikasi.";

      const generatedSummary =
        "Rumusan Eksekutif Pentadbiran:\n" +
        "• Keputusan Utama: Reka bentuk skrin berprestasi tinggi disahkan menggunakan layout TypeScript.\n" +
        "• Tindakan Susulan:\n" +
        "  - Memastikan parameter routing dipadankan ke komponen AudioUploadScreen.";

      // Send clean data directly back up to App.tsx
      onAudioProcessed(meeting.id, generatedTranscript, generatedSummary);
    }, 1200);
  };

  return (
    <PageContainer>
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} className="mb-4 py-1">
        <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
          Muat Naik Audio Mesyuarat
        </Text>
        <Text className="text-slate-500 text-sm">
          Profil Mesyuarat Aktif: {meeting.name}
        </Text>
      </View>

      {/* Upload Panel */}
      <Panel>
        <TouchableOpacity
          onPress={triggerMockFileSelection}
          className="border-2 border-dashed border-slate-300 rounded-2xl p-10 items-center justify-center bg-slate-50"
          activeOpacity={0.8}
        >
          <Text className="text-4xl mb-3">🎵</Text>
          <Text className="text-slate-800 font-bold text-base">
            {attachedFile ? attachedFile.name : 'Klik Untuk Pilih Fail Rekod Audio (.mp3)'}
          </Text>
          <Text className="text-slate-400 text-xs mt-1">
            {attachedFile ? attachedFile.size : 'Format yang disokong: .mp3, .wav, .m4a'}
          </Text>
        </TouchableOpacity>

        {nlpEvaluating && (
          <View className="bg-blue-50 p-4 rounded-xl items-center mt-4 border border-blue-100">
            <ActivityIndicator size="small" color="#1E3A8A" />
            <Text className="text-blue-950 font-semibold text-xs text-center mt-2">
              Menjana Transkripsi & Minit Mesyuarat Pintar (AI)...
            </Text>
          </View>
        )}

        {!nlpEvaluating && (
          <View className="mt-6">
            {/* Standard React Native button replaces custom wrapper action buttons */}
            <TouchableOpacity 
              onPress={executeNlpEvaluationPipeline}
              className="w-full h-12 bg-emerald-600 rounded-xl items-center justify-center shadow-sm active:bg-emerald-700"
            >
              <Text className="text-white font-bold text-sm">
                Proses Rekod Audio Pintar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Panel>
    </PageContainer>
  );
};