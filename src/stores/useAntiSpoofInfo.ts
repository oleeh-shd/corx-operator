import { create } from 'zustand';
import { TaskStatuses } from '../utils/enum/taskStatuses';
import { TaskType } from '../utils/enum/taskType';

interface TaskData {
  "is_spoof"?: boolean;
}

export interface AntiSpoofInfo {
  audio_id: string;
  task_id: string;
  task_type: TaskType;
  task_status: TaskStatuses;
  task_data: TaskData;
}

interface AntiSpoofInfoStore extends AntiSpoofInfo {
  updateAntiSpoofInfo: (newInfo: AntiSpoofInfo) => void;
}

export const useAntiSpoofInfoStore = create<AntiSpoofInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: TaskType.VERIFY,
  task_status: TaskStatuses.WAITING,
  task_data: {},
  updateAntiSpoofInfo: (newInfo: AntiSpoofInfo) => set(newInfo),
}));
