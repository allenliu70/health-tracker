export interface BPReadingInput {
  systolic: number;
  diastolic: number;
  pulse?: number | null;
  takenAt: string; // ISO string from client
  notes?: string | null;
  source?: string | null;
}

export interface BPReading {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number | null;
  takenAt: string; // ISO string when sending to client
  notes: string | null;
  source: string;
}
