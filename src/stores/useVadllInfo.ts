import { create } from 'zustand';

interface TaskData {
  total_seconds: number;
  required_seconds?: number;
}

export interface VadInfo {
  audio_id: string;
  task_id: string;
  task_type: string;
  task_status: string;
  task_data: TaskData;
}

interface VadInfoStore extends VadInfo {
  updateVadInfo: (newInfo: VadInfo) => void;
  refreshVadTotalSeconds: () => void;
}

export const useVadInfoStore = create<VadInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: '',
  task_status: '',
  task_data: {
    total_seconds: 0,
  },
  updateVadInfo: (newInfo: VadInfo) => set(newInfo),
  refreshVadTotalSeconds: () => set((prev) => ({ ...prev, task_data: { total_seconds: 0 } })),
}));
