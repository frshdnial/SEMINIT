export interface Meeting {
  id: string;
  name: string;

  location: string;
  participants: string;

  date: string;
  start_time: string;
  end_time: string;

  status: string;

  audio_path?: string | null;
  audio_url?: string | null;

  transcript?: string;
  summary?: string;
}