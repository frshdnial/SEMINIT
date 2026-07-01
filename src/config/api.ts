// 🚀 UPDATED: Points exactly to your machine's active local IP address
const BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  getMeetings: `${BASE_URL}/meetings`,
  createMeeting: `${BASE_URL}/meetings`,
  uploadAudio: (id: string | number) => `${BASE_URL}/meetings/${id}/audio`,
  updateMeetingNlp: (id: string | number) => `${BASE_URL}/meetings/${id}/nlp`,
};