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

  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioMethod, setAudioMethod] = useState<
    "NONE" | "UPLOAD" | "RECORD"
  >("NONE");

  const [nlpEvaluating, setNlpEvaluating] = useState(false);

  const triggerMockFileSelection = () => {
    setAttachedFile({
      name: 'rekod_mesyuarat_bantuan_kulai.mp3',
      size: '34.2 MB',
    });
  };

  const startRecording = () => {
    setRecording(true);
    setPaused(false);
    setRecorded(false);
    setRecordingTime(0);

    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    (global as any).recordingTimer = timer;
  };

  const pauseRecording = () => {
    clearInterval((global as any).recordingTimer);
    setPaused(true);
    setRecording(false);
  };

  const resumeRecording = () => {
    setPaused(false);
    setRecording(true);

    const timer = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    (global as any).recordingTimer = timer;
  };

  const stopRecording = () => {
    clearInterval((global as any).recordingTimer);

    setRecording(false);
    setPaused(false);
    setRecorded(true);

    setAttachedFile({
      name: "meeting_recording.wav",
      size: "Recorded Audio",
    });
  };

  const executeNlpEvaluationPipeline = () => {
    setAttachedFile({
      name: 'rekod_mesyuarat_bantuan_kulai.mp3',
      size: '34.2 MB',
    });

    setNlpEvaluating(true);

    // Fast simulation layout transition delay (1.2 seconds)
    setTimeout(() => {
      setNlpEvaluating(false);

      // Longer, realistic conversation transcript focusing on Bantuan Kewangan Daerah Kulai
      const generatedTranscript =
        "[00:05] Pengerusi: Assalamualaikum dan selamat pagi semua. Agenda utama perbincangan kita hari ini adalah untuk memperhalusi pelancaran program Bantuan Kewangan Daerah Kulai bagi fasa kedua tahun ini. Kita perlu pastikan dana diagihkan dengan adil kepada golongan sasar.\n\n" +
        "[00:45] Puan Aminah (Kebajikan): Terima kasih Tuan Pengerusi. Berdasarkan data kemas kini, kami telah mengenalpasti seramai 1,200 ketua isi rumah di sekitar mukim Kulai, Senai, dan Kelapa Sawit yang layak menerima skim bantuan kecemasan sara hidup ini. Isu utama sekarang adalah kaedah pengagihan bagi mengelakkan kesesakan.\n\n" +
        "[01:30] Encik Hafiz (Kewangan): Menyentuh tentang dana, peruntukan keseluruhan yang telah diluluskan adalah sebanyak RM500,000. Setiap keluarga yang terpilih akan menerima bantuan sekali beri (one-off) bernilai RM400. Pihak kami mencadangkan pemindahan elektronik terus ke akaun bank penerima untuk mempercepatkan proses.\n\n" +
        "[02:15] Pengerusi: Pilihan pemindahan terus elektronik itu sangat bagus Encik Hafiz. Namun, bagaimana pula dengan komuniti warga emas atau penduduk pedalaman yang tiada akses perbankan digital aktif?\n\n" +
        "[02:40] Puan Aminah (Kebajikan): Untuk kes khas seperti itu, pasukan sukarelawan kami akan turun padang ke dewan parlimen daerah masing-masing pada hujung minggu depan bagi menyerahkan tunai secara terus beserta baucar barangan asas.\n\n" +
        "[03:10] Encik Hafiz (Kewangan): Setuju. Seterusnya, kita perlukan tarikh akhir pendaftaran dokumen sokongan. Saya cadangkan tarikh tutup adalah pada hari Jumaat ini jam 5 petang bagi memberi ruang audit akaun diselesaikan awal bulan depan.\n\n" +
        "[03:45] Pengerusi: Baik, cadangan diterima. Pastikan hebahan di media sosial, papan kenyataan awam, dan melalui ketua-ketua kampung dilakukan secara menyeluruh bermula petang ini. Terima kasih semua.";

      // Informative, logical structured Executive Summary
      const generatedSummary =
        "RUMUSAN EKSEKUTIF: PROGRAM BANTUAN KEWANGAN DAERAH KULAI\n\n" +
        "1. OBJEKTIF & DANA PERUNTUKAN\n" +
        "• Meluluskan agihan dana berjumlah RM500,000 untuk Fasa Kedua bagi meringankan kos sara hidup penduduk yang terkesan di Daerah Kulai.\n" +
        "• Skop geografi utama agihan merangkumi Mukim Kulai, Mukim Senai, dan Kawasan Kelapa Sawit.\n\n" +
        "2. KAEDAH & STRUKTUR AGIHAN\n" +
        "• Seramai 1,200 ketua isi rumah (KIR) telah disahkan layak melalui tapisan data Jabatan Kebajikan.\n" +
        "• Nilai bantuan ditetapkan sebanyak RM400 per keluarga secara sekali beri (one-off).\n" +
        "• Saluran agihan utama menggunakan pindahan akaun bank secara terus (EFT) untuk mempercepat urusan.\n" +
        "• Agihan tunai secara fizikal dan penyerahan baucar keperluan makanan asas akan dilaksanakan khas untuk warga emas tanpa akaun bank di dewan parlimen tempatan.\n\n" +
        "3. PELAN TINDAKAN & TARIKH AKHIR\n" +
        "• Tarikh Tutup Pendaftaran: Hari Jumaat ini, jam 5.00 petang bagi membolehkan audit akaun segera dilakukan.\n" +
        "• Publisiti Awam: Menggerakkan ketua kampung dan mengoptimumkan media sosial rasmi pejabat daerah bermula petang ini untuk hebahan meluas.";

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

          {/* ================= CHOOSE METHOD ================= */}

          {audioMethod === "NONE" && (
            <View>

              <Text className="text-lg font-bold text-center text-slate-800 mb-6">
                Pilih Kaedah Audio
              </Text>

              <TouchableOpacity
                onPress={() => setAudioMethod("UPLOAD")}
                className="bg-blue-900 rounded-2xl p-6 items-center mb-4"
              >
                <Text className="text-5xl mb-2">🎵</Text>

                <Text className="text-white font-bold text-lg">
                  Muat Naik Audio
                </Text>

                <Text className="text-blue-100 text-sm mt-1">
                  Pilih fail audio daripada peranti
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAudioMethod("RECORD")}
                className="bg-red-600 rounded-2xl p-6 items-center"
              >
                <Text className="text-5xl mb-2">🎙</Text>

                <Text className="text-white font-bold text-lg">
                  Rakam Audio
                </Text>

                <Text className="text-red-100 text-sm mt-1">
                  Rakam mesyuarat secara langsung
                </Text>
              </TouchableOpacity>

            </View>
          )}

          {/* ================= UPLOAD ================= */}

          {audioMethod === "UPLOAD" && (
            <>

              <TouchableOpacity
                onPress={triggerMockFileSelection}
                className="border-2 border-dashed border-slate-300 rounded-2xl p-10 items-center justify-center bg-slate-50"
              >
                <Text className="text-4xl mb-3">🎵</Text>

                <Text className="text-slate-800 font-bold text-base">
                  {attachedFile
                    ? attachedFile.name
                    : "Klik Untuk Pilih Fail Rekod Audio (.mp3)"}
                </Text>

                <Text className="text-slate-400 text-xs mt-1">
                  {attachedFile
                    ? attachedFile.size
                    : "Format: .mp3 .wav .m4a"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setAudioMethod("NONE");
                  setAttachedFile(null);
                }}
                className="mt-4 items-center"
              >
                <Text className="text-blue-900 font-bold">
                  ← Pilih Kaedah Lain
                </Text>
              </TouchableOpacity>

            </>
          )}

          {/* ================= RECORD ================= */}

          {audioMethod === "RECORD" && (
            <>

              <View className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

                <Text className="text-lg font-bold mb-4">
                  🎙 Record Audio
                </Text>

                <Text className="text-center text-4xl font-bold mb-6">
                  {new Date(recordingTime * 1000)
                    .toISOString()
                    .substr(14,5)}
                </Text>

                {!recording && !paused && !recorded && (

                  <TouchableOpacity
                    className="bg-red-600 rounded-xl py-4 items-center"
                    onPress={startRecording}
                  >
                    <Text className="text-white font-bold">
                      🔴 Start Recording
                    </Text>
                  </TouchableOpacity>

                )}

                {recording && (

                  <View className="flex-row justify-center">

                    <TouchableOpacity
                      className="bg-yellow-500 rounded-xl px-6 py-3 mr-3"
                      onPress={pauseRecording}
                    >
                      <Text className="text-white font-bold">
                        ⏸ Pause
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="bg-red-600 rounded-xl px-6 py-3"
                      onPress={stopRecording}
                    >
                      <Text className="text-white font-bold">
                        ⏹ Stop
                      </Text>
                    </TouchableOpacity>

                  </View>

                )}

                {paused && (

                  <View className="flex-row justify-center">

                    <TouchableOpacity
                      className="bg-blue-600 rounded-xl px-6 py-3 mr-3"
                      onPress={resumeRecording}
                    >
                      <Text className="text-white font-bold">
                        ▶ Resume
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="bg-red-600 rounded-xl px-6 py-3"
                      onPress={stopRecording}
                    >
                      <Text className="text-white font-bold">
                        ⏹ Stop
                      </Text>
                    </TouchableOpacity>

                  </View>

                )}

                {recorded && (
                  <Text className="text-green-600 text-center font-bold mt-4">
                    ✅ Recording Saved
                  </Text>
                )}

              </View>

              <TouchableOpacity
                onPress={() => {

                  setAudioMethod("NONE");
                  setRecording(false);
                  setPaused(false);
                  setRecorded(false);
                  setRecordingTime(0);

                }}
                className="mt-4 items-center"
              >
                <Text className="text-blue-900 font-bold">
                  ← Pilih Kaedah Lain
                </Text>
              </TouchableOpacity>

            </>
          )}

          {/* ================= PROCESS ================= */}

          {audioMethod !== "NONE" && nlpEvaluating && (

            <View className="bg-blue-50 p-4 rounded-xl items-center mt-4 border border-blue-100">

              <ActivityIndicator size="small" color="#1E3A8A"/>

              <Text className="text-blue-950 font-semibold text-xs mt-2 text-center">
                Menjana Transkripsi & Minit Mesyuarat Pintar (AI)...
              </Text>

            </View>

          )}

          {audioMethod !== "NONE" && !nlpEvaluating && (

            <View className="mt-6">

              <TouchableOpacity
                onPress={executeNlpEvaluationPipeline}
                className="w-full h-12 bg-emerald-600 rounded-xl items-center justify-center"
              >
                <Text className="text-white font-bold">
                  Proses Rekod Audio Pintar
                </Text>
              </TouchableOpacity>

            </View>

          )}

        </Panel>
    </PageContainer>
  );
};