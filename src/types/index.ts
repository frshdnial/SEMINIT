export interface Meeting {
  id: string;
  name: string;
  participants: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Pending Audio' | 'Processing' | 'Completed';
  transcript?: string;
  summary?: string;
}