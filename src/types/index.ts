export interface Meeting {
  id: string;
  name: string;

  location: string;
  participants: string;

  date: string;
  startTime: string;
  endTime: string;

  status: string;

  transcript?: string;
  summary?: string;
}