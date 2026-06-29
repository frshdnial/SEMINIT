import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { ActionButton } from '../components/ActionButton';
import { PageContainer } from '../components/ui/PageContainer';
import { Panel } from '../components/ui/Panel';
import { Meeting } from '../types';

interface GenerateMinutesScreenProps {
  meeting: Meeting;
  onSaveAndClose: () => void;
  onBack: () => void;
}

export const GenerateMinutesScreen: React.FC<GenerateMinutesScreenProps> = ({
  meeting,
  onSaveAndClose,
  onBack,
}) => {
  const [subViewTab, setSubViewTab] = useState<'transcript' | 'summary'>(
    'summary' // Defaulted to summary matrix for executive previewing
  );

  return (
    <PageContainer>
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        className="mb-4 py-1"
      >
        <Text className="text-blue-900 font-bold text-sm">
          ← Back to Repository
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-6 flex-row justify-between items-center">
        <View className="flex-1 mr-4">
          <Text
            className="text-2xl font-bold text-slate-900 tracking-tight"
            numberOfLines={1}
          >
            {meeting.name}
          </Text>

          <Text className="text-slate-500 text-sm mt-1">
            Generated Draft Evaluation Matrix
          </Text>
        </View>

        <View className="bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
          <Text className="text-amber-800 font-bold text-xs">
            Review Draft
          </Text>
        </View>
      </View>

      {/* Main Container Panel */}
      <Panel className="p-0 overflow-hidden flex-1 mb-6">
        {/* Sub-navigation Tabs */}
        <View className="flex-row border-b border-slate-200 bg-slate-50">
          <TouchableOpacity
            className={`flex-1 py-4 items-center ${
              subViewTab === 'summary'
                ? 'border-b-2 border-blue-900 bg-white'
                : ''
            }`}
            onPress={() => setSubViewTab('summary')}
          >
            <Text
              className={`font-semibold text-sm ${
                subViewTab === 'summary'
                  ? 'text-blue-900'
                  : 'text-slate-400'
              }`}
            >
              Summary Matrix
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-4 items-center ${
              subViewTab === 'transcript'
                ? 'border-b-2 border-blue-900 bg-white'
                : ''
            }`}
            onPress={() => setSubViewTab('transcript')}
          >
            <Text
              className={`font-semibold text-sm ${
                subViewTab === 'transcript'
                  ? 'text-blue-900'
                  : 'text-slate-400'
              }`}
            >
              Full Text Transcript
            </Text>
          </TouchableOpacity>
        </View>

        {/* Generated Blueprint View Area */}
        <ScrollView
          className="max-h-[450px]"
          showsVerticalScrollIndicator={false}
        >
          <View className="p-6">
            {subViewTab === 'summary' ? (
              <View>
                <Text className="text-slate-800 text-sm leading-7 whitespace-pre-line">
                  {meeting.summary || 'No summaries extracted yet.'}
                </Text>
              </View>
            ) : (
              <View>
                <Text className="text-slate-800 text-sm leading-6 font-mono bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
                  {meeting.transcript || 'No transcripts evaluated yet.'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Meta Context footer item */}
        <View className="bg-slate-50 border-t border-slate-100 p-4 px-6">
          <Text className="text-xxs text-slate-400 uppercase tracking-wider">
            Metadata Profile: {meeting.date} ({meeting.startTime} - {meeting.endTime}) | Location: {meeting.location}
          </Text>
        </View>
      </Panel>

      {/* Primary Action Row */}
      <View className="mt-2 mb-4">
        <ActionButton
          title="Commit Minutes to Dashboard Record"
          onPress={onSaveAndClose}
          variant="primary"
        />
      </View>
    </PageContainer>
  );
};