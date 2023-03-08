import { create } from 'zustand';
import { TaskStatuses } from '../utils/enum/taskStatuses';
import { TaskType } from '../utils/enum/taskType';

interface TaskData {
  age: string;
}

export interface AgeInfo {
  audio_id: string;
  task_id: string;
  task_type: TaskType;
  task_status: TaskStatuses | '';
  task_data: TaskData;
}

interface AgeInfoStore extends AgeInfo {
  updateAgeInfo: (newInfo: AgeInfo) => void;
}

export const useAgeInfoStore = create<AgeInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: TaskType.VERIFY,
  task_status: '',
  task_data: {
    age: '',
  },
  updateAgeInfo: (newInfo: AgeInfo) => set(newInfo),
}));
