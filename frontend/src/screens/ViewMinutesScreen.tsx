import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface ViewMinutesScreenProps {
  meeting: Meeting;
  onBack: () => void;
}

export const ViewMinutesScreen: React.FC<ViewMinutesScreenProps> = ({
  meeting,
  onBack,
}) => {
  const [subViewTab, setSubViewTab] = useState<
    'transcript' | 'summary'
  >('transcript');

  return (
    <PageContainer>
      {/* Back Button */}

      <TouchableOpacity
        onPress={onBack}
        className="mb-4 py-1"
      >
        <Text className="text-blue-900 font-bold text-sm">
          ← Workspace Grid
        </Text>
      </TouchableOpacity>

      {/* Header */}

      <View className="mb-6">
        <Text
          className="text-2xl font-bold text-slate-900 tracking-tight"
          numberOfLines={1}
        >
          {meeting.name}
        </Text>

        <Text className="text-slate-500 text-sm mt-1">
          NLP Generation Interface Sandbox
        </Text>
      </View>

      {/* Tabs */}

      <Panel className="p-0 overflow-hidden">
        <View className="flex-row border-b border-slate-200">
          <TouchableOpacity
            className={`flex-1 py-4 items-center ${
              subViewTab === 'transcript'
                ? 'border-b-2 border-blue-900'
                : ''
            }`}
            onPress={() => setSubViewTab('transcript')}
          >
            <Text
              className={`font-semibold ${
                subViewTab === 'transcript'
                  ? 'text-blue-900'
                  : 'text-slate-400'
              }`}
            >
              Full Text Transcript
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-4 items-center ${
              subViewTab === 'summary'
                ? 'border-b-2 border-blue-900'
                : ''
            }`}
            onPress={() => setSubViewTab('summary')}
          >
            <Text
              className={`font-semibold ${
                subViewTab === 'summary'
                  ? 'text-blue-900'
                  : 'text-slate-400'
              }`}
            >
              Summary Matrix
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="max-h-[500px]"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-5">
            {subViewTab === 'transcript' ? (
              <Text className="text-slate-800 text-sm leading-6">
                {meeting.transcript ||
                  'No transcripts evaluated.'}
              </Text>
            ) : (
              <Text className="text-slate-800 text-sm leading-6">
                {meeting.summary ||
                  'No summaries extracted.'}
              </Text>
            )}
          </View>
        </ScrollView>
      </Panel>
    </PageContainer>
  );
};