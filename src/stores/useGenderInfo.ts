import { create } from 'zustand';
import { TaskStatuses } from '../utils/enum/taskStatuses';
import { TaskType } from '../utils/enum/taskType';

interface TaskData {
  "gender": string;
}

export interface GenderInfo {
  audio_id: string;
  task_id: string;
  task_type: TaskType;
  task_status: TaskStatuses;
  task_data: TaskData;
}

interface GenderInfoStore extends GenderInfo {
  updateGenderInfo: (newInfo: GenderInfo) => void;
}

export const useGenderInfoStore = create<GenderInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: TaskType.VERIFY,
  task_status: TaskStatuses.WAITING,
  task_data: {
    gender: ''
  },
  updateGenderInfo: (newInfo: GenderInfo) => set(newInfo),
}));
