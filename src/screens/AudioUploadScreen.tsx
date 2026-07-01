import * as DocumentPicker from 'expo-document-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppLayout } from '../components/layout/AppLayout';
import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { API_ENDPOINTS } from '../config/api';
import { Meeting } from '../types';

// Format dan saiz fail audio yang dibenarkan, dipadankan dengan validation
// rule 'mimes:mp3,wav,m4a,mpga|max:51200' di MeetingController@uploadAudio
const ALLOWED_AUDIO_EXTENSIONS = ['mp3', 'wav', 'm4a'];
const MAX_AUDIO_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    alert(message);
  } else {
    Alert.alert(title, message);
  }
};

const formatFileSize = (bytes?: number) => {
  if (!bytes || bytes <= 0) return '';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

interface AttachedAudioFile {
  name: string;
  size: string;
  uri: string;
  mimeType?: string;
  // Present only on web (react-native-web) — the real browser File object,
  // used to build FormData directly instead of relying on the file:// uri.
  webFile?: File;
  // False for the still-mocked "record live" flow below — only real,
  // user-picked files are actually uploaded to the backend.
  isRealFile: boolean;
}

interface AudioUploadScreenProps {
  meeting: Meeting;
  onAudioProcessed: (
    id: string,
    transcript: string,
    summary: string
  ) => void;
  onBack: () => void;
  onNavigateToSetup?: () => void;
  onNavigateToList?: () => void;
  onNavigateToDashboard?: () => void;
}

export const AudioUploadScreen: React.FC<AudioUploadScreenProps> = ({
  meeting,
  onAudioProcessed,
  onBack,
  onNavigateToSetup = () => {},
  onNavigateToList = () => {},
  onNavigateToDashboard = () => {},
}) => {
  const [attachedFile, setAttachedFile] = useState<AttachedAudioFile | null>(null);

  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioMethod, setAudioMethod] = useState<
    "NONE" | "UPLOAD" | "RECORD"
  >("NONE");

  const [nlpEvaluating, setNlpEvaluating] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);

  // Bersihkan pemasa jika komponen di-unmount semasa merekod
  useEffect(() => {
    return () => {
      if ((global as any).recordingTimer) {
        clearInterval((global as any).recordingTimer);
      }
    };
  }, []);

  // Membuka pemilih fail sistem sebenar dan mengesahkan format & saiz fail
  // audio yang dipilih sebelum ia dibenarkan untuk dimuat naik.
  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'audio/mpeg',
          'audio/mp3',
          'audio/wav',
          'audio/x-wav',
          'audio/m4a',
          'audio/x-m4a',
          'audio/*',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      const extension = asset.name?.split('.').pop()?.toLowerCase() ?? '';

      if (!ALLOWED_AUDIO_EXTENSIONS.includes(extension)) {
        showAlert(
          'Format Tidak Disokong',
          'Sila pilih fail audio dalam format .mp3, .wav atau .m4a sahaja.'
        );
        return;
      }

      if (asset.size && asset.size > MAX_AUDIO_FILE_SIZE_BYTES) {
        showAlert('Fail Terlalu Besar', 'Saiz fail melebihi had maksimum 50MB.');
        return;
      }

      setAttachedFile({
        name: asset.name,
        size: formatFileSize(asset.size),
        uri: asset.uri,
        mimeType: asset.mimeType,
        webFile: (asset as any).file,
        isRealFile: true,
      });
    } catch (error) {
      console.error('Ralat memilih fail audio:', error);
      showAlert('Ralat', 'Gagal memilih fail audio. Sila cuba lagi.');
    }
  };

  // Menghantar fail audio sebenar ke backend Laravel (multipart/form-data),
  // yang menyimpannya ke storage/app/public/meeting_audio dan mengemaskini
  // lajur audio_path bagi rekod mesyuarat ini dalam pangkalan data.
  const uploadAudioToServer = async (): Promise<boolean> => {
    if (!attachedFile) return false;

    const formData = new FormData();

    if (Platform.OS === 'web' && attachedFile.webFile) {
      formData.append('audio', attachedFile.webFile, attachedFile.name);
    } else {
      formData.append('audio', {
        uri: attachedFile.uri,
        name: attachedFile.name,
        type: attachedFile.mimeType || 'audio/mpeg',
      } as any);
    }

    setUploadingAudio(true);
    try {
      const response = await fetch(API_ENDPOINTS.uploadAudio(meeting.id), {
        method: 'POST',
        headers: {
          // Sengaja TIDAK menetapkan 'Content-Type' secara manual di sini —
          // fetch perlu menjana boundary multipart secara automatik sendiri.
          'Accept': 'application/json',
        },
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          result?.errors?.audio?.[0] ||
          result?.message ||
          'Gagal memuat naik fail audio ke pelayan.';
        showAlert('Ralat Muat Naik', message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Ralat rangkaian ketika memuat naik audio:', error);
      showAlert('Ralat', 'Ralat sambungan rangkaian ke pelayan.');
      return false;
    } finally {
      setUploadingAudio(false);
    }
  };


  const startRecording = () => {
    setRecording(true);
    setPaused(false);
    setRecorded(false);
    setRecordingTime(0);
    setAttachedFile(null);

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
      uri: '',
      isRealFile: false,
    });
  };

  const executeNlpEvaluationPipeline = async () => {
    if (!attachedFile) return;

    setNlpEvaluating(true);

    // Muat naik fail audio SEBENAR ke backend Laravel & pangkalan data dahulu.
    // (Mod rakaman langsung masih placeholder buat masa ini — lihat isRealFile.)
    if (attachedFile.isRealFile) {
      const uploaded = await uploadAudioToServer();
      if (!uploaded) {
        setNlpEvaluating(false);
        return;
      }
    }

    // NOTA: Transkripsi & rumusan di bawah masih dijana secara mock/placeholder
    // kerana perkhidmatan Speech-to-Text/NLP sebenar belum disambungkan lagi.
    // Fail audio itu sendiri, bagaimanapun, kini benar-benar dimuat naik dan
    // disimpan di backend/pangkalan data di atas.
    setTimeout(() => {
      setNlpEvaluating(false);
      
      const generatedTranscript =
        "[00:05] Pengerusi: Assalamualaikum dan selamat pagi semua. Agenda utama perbincangan kita hari ini adalah untuk memperhalusi pelancaran program Bantuan Kewangan Daerah Kulai bagi fasa kedua tahun ini. Kita perlu pastikan dana diagihkan dengan adil kepada golongan sasar.\n\n" +
        "[00:45] Puan Aminah (Kebajikan): Terima kasih Tuan Pengerusi. Berdasarkan data kemas kini, kami telah mengenalpasti seramai 1,200 ketua isi rumah di sekitar mukim Kulai, Senai, dan Kelapa Sawit yang layak menerima skim bantuan kecemasan sara hidup ini. Isu utama sekarang adalah kaedah pengagihan bagi mengelakkan kesesakan.\n\n" +
        "[01:30] Encik Hafiz (Kewangan): Menyentuh tentang dana, peruntukan keseluruhan yang telah diluluskan adalah sebanyak RM500,000. Setiap keluarga yang terpilih akan menerima bantuan sekali beri (one-off) bernilai RM400. Pihak kami mencadangkan pemindahan elektronik terus ke akaun bank penerima untuk mempercepatkan proses.\n\n" +
        "[02:15] Pengerusi: Pilihan pemindahan terus elektronik itu sangat bagus Encik Hafiz. Namun, bagaimana pula dengan komuniti warga emas atau penduduk pedalaman yang tiada akses perbankan digital aktif?\n\n" +
        "[02:40] Puan Aminah (Kebajikan): Untuk kes khas seperti itu, pasukan sukarelawan kami akan turun padang ke dewan parlimen daerah masing-masing pada hujung minggu depan bagi menyerahkan tunai secara terus beserta baucar barangan asas.\n\n" +
        "[03:10] Encik Hafiz (Kewangan): Setuju. Seterusnya, kita perlukan tarikh akhir pendaftaran dokumen sokongan. Saya cadangkan tarikh tutup adalah pada hari Jumaat ini jam 5 petang bagi memberi ruang audit akaun diselesaikan awal bulan depan.\n\n" +
        "[03:45] Pengerusi: Baik, cadangan diterima. Pastikan hebahan di media sosial, papan kenyataan awam, dan melalui ketua-ketua kampung dilakukan secara menyeluruh bermula petang ini. Terima kasih semua.";

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
      
      onAudioProcessed(
        meeting.id,
        generatedTranscript,
        generatedSummary
      );
    }, 2000);
  };

  return (
    <AppLayout
      activeRoute="CreateMeeting"
      onNavigateToSetup={onNavigateToSetup}
      onNavigateToList={onNavigateToList}
      onNavigateToDashboard={onNavigateToDashboard}
    >
      <PageContainer>
        <View className="w-full max-w-4xl mx-auto px-4 py-2">
          {/* Back Button */}
          <TouchableOpacity onPress={onBack} className="mb-4 py-1 self-start">
            <Text className="text-blue-900 font-bold text-sm">← Kembali</Text>
          </TouchableOpacity>

          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-slate-900 tracking-tight">
              Input Rakaman Suara
            </Text>
            <Text className="text-slate-500 text-sm mt-0.5">
              Sila pilih mod penyerahan fail multimedia untuk memproses minit mesyuarat automatik.
            </Text>
          </View>

          <Panel className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl mb-6">
            {audioMethod === "NONE" && (
              <View className="flex flex-col md:flex-row gap-4">
                <TouchableOpacity
                  onPress={() => setAudioMethod("UPLOAD")}
                  className="flex-1 border-2 border-dashed border-slate-200 hover:border-blue-900 p-8 rounded-xl items-center bg-slate-50"
                >
                  <Text className="text-3xl mb-2">📁</Text>
                  <Text className="text-slate-800 font-bold text-sm">Muat Naik Fail Audio</Text>
                  <Text className="text-slate-400 text-xs mt-1 text-center">Pilih dokumen audio sedia ada dari peranti (.mp3, .wav)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAudioMethod("RECORD")}
                  className="flex-1 border-2 border-dashed border-slate-200 hover:border-blue-900 p-8 rounded-xl items-center bg-slate-50"
                >
                  <Text className="text-3xl mb-2">🎙️</Text>
                  <Text className="text-slate-800 font-bold text-sm">Rakam Suara Langsung</Text>
                  <Text className="text-slate-400 text-xs mt-1 text-center">Rakam terus menggunakan mikrofon peranti anda</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* ================= UPLOAD MODE ================= */}
            {audioMethod === "UPLOAD" && !nlpEvaluating && (
              <>
                <TouchableOpacity
                  onPress={pickAudioFile}
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

                <TouchableOpacity
                  onPress={() => {
                    setAudioMethod("NONE");
                    setAttachedFile(null);
                  }}
                  className="mt-4 items-center"
                >
                  <Text className="text-blue-900 font-bold text-sm">← Pilih Kaedah Lain</Text>
                </TouchableOpacity>
              </>
            )}

            {/* ================= RECORD MODE ================= */}
            {audioMethod === "RECORD" && !nlpEvaluating && (
              <>
                <View className="items-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Text className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">Masa Rakaman</Text>
                  <Text className="text-3xl font-black text-slate-800 mb-6">
                    {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                  </Text>

                  <View className="flex-row gap-4 w-full justify-center px-4">
                    {/* Keadaan 1: Belum Mula Rakam */}
                    {!recording && !paused && !recorded && (
                      <TouchableOpacity
                        onPress={startRecording}
                        className="bg-red-600 px-6 h-11 justify-center rounded-xl min-w-[150px] items-center"
                      >
                        <Text className="text-white font-bold text-sm">● Mula Rakam</Text>
                      </TouchableOpacity>
                    )}

                    {/* Keadaan 2: Sesi Rakaman Aktif (Jeda & Tamat Berwarna Merah Kelihatan Jelas Secara Bersebelahan) */}
                    {(recording || paused) && (
                      <>
                        <TouchableOpacity
                          onPress={paused ? resumeRecording : pauseRecording}
                          className="bg-slate-700 h-11 justify-center rounded-xl flex-1 max-w-[140px] items-center"
                        >
                          <Text className="text-white font-bold text-sm">{paused ? "▶ Sambung" : "⏸ Jeda"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={stopRecording}
                          className="bg-red-600 h-11 justify-center rounded-xl flex-1 max-w-[140px] items-center"
                        >
                          <Text className="text-white font-bold text-sm">■ Tamat</Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {/* Keadaan 3: Selesai Rakam */}
                    {recorded && !recording && !paused && (
                      <TouchableOpacity
                        onPress={() => {
                          setRecorded(false);
                          setRecordingTime(0);
                          setAttachedFile(null);
                        }}
                        className="bg-slate-200 px-5 h-11 justify-center rounded-xl items-center"
                      >
                        <Text className="text-slate-700 font-bold text-sm">Padam & Rakam Semula</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* Indikator Paparan Fail Berjaya Dicipta Selepas Klik Tamat */}
                {attachedFile && recorded && (
                  <View className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl items-center">
                    <Text className="text-emerald-900 font-semibold text-sm">📁 {attachedFile.name}</Text>
                    <Text className="text-emerald-600 text-xs mt-0.5">{attachedFile.size}</Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => {
                    if ((global as any).recordingTimer) {
                      clearInterval((global as any).recordingTimer);
                    }
                    setAudioMethod("NONE");
                    setRecording(false);
                    setPaused(false);
                    setRecorded(false);
                    setRecordingTime(0);
                    setAttachedFile(null);
                  }}
                  className="mt-4 items-center"
                >
                  <Text className="text-blue-900 font-bold text-sm">← Pilih Kaedah Lain</Text>
                </TouchableOpacity>
              </>
            )}

            {/* ================= PROCESS & EVALUATION STATUS ================= */}
            {audioMethod !== "NONE" && nlpEvaluating && (
              <View className="bg-blue-50 p-4 rounded-xl items-center mt-4 border border-blue-100">
                <ActivityIndicator size="small" color="#1E3A8A" />
                <Text className="text-blue-950 font-semibold text-xs mt-2 text-center">
                  {uploadingAudio
                    ? 'Memuat naik fail audio ke pelayan...'
                    : 'Menjana Transkripsi & Minit Mesyuarat Pintar (AI)...'}
                </Text>
              </View>
            )}

            {audioMethod !== "NONE" && !nlpEvaluating && (
              <View className="mt-6">
                <TouchableOpacity
                  onPress={executeNlpEvaluationPipeline}
                  disabled={!attachedFile}
                  className={`w-full h-12 rounded-xl items-center justify-center shadow-sm ${
                    !attachedFile ? 'bg-slate-200' : 'bg-emerald-600 active:bg-emerald-700'
                  }`}
                >
                  <Text className={`font-bold text-sm ${!attachedFile ? 'text-slate-400' : 'text-white'}`}>
                    Proses Rekod Audio Pintar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Panel>
        </View>
      </PageContainer>
    </AppLayout>
  );
};