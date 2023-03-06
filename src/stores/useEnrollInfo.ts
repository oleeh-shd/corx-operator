import { create } from 'zustand';
import { TaskStatuses } from '../utils/enum/taskStatuses';
import { TaskType } from '../utils/enum/taskType';
import { MetaData } from './sharedTypes';

interface TaskData {
  buffer_seconds: number;
  client_id: string;
  is_success?: boolean;
}

export interface EnrollInfo {
  audio_id: string;
  task_id: string;
  task_type: TaskType;
  task_status: TaskStatuses;
  task_data: TaskData;
  meta_data: MetaData;
}

interface EnrollInfoStore extends EnrollInfo {
  updateEnrollInfo: (newInfo: EnrollInfo) => void;
}

export const useEnrollInfoStore = create<EnrollInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: TaskType.ENROLL,
  task_status: TaskStatuses.WAITING,
  task_data: {
    buffer_seconds: 5,
    client_id: '',
  },
  meta_data: {
    operator_id: '',
    org_id: 1,
    org_slug: '',
    client_id: '',
  },
  updateEnrollInfo: (newInfo: EnrollInfo) => set(newInfo),
}));
