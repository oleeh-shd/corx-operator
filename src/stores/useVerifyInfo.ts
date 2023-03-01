import { create } from 'zustand';
import { MetaData, TaskStatus, TaskType } from './sharedTypes';

interface TaskData {
  enroll_signature: string;
  max_attempts: number;
  target_score: number;
  is_success?: boolean;
}

interface VerifyInfo {
  audio_id: string;
  task_id: string;
  task_type: TaskType;
  task_status: TaskStatus;
  task_data: TaskData;
  meta_data: MetaData;
}

interface VerifyInfoStore extends VerifyInfo {
  updateVerifyInfo: (newInfo: VerifyInfo) => void;
}

export const useVerifyInfoStore = create<VerifyInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: 'verify',
  task_status: 'waiting',
  task_data: {
    enroll_signature: '',
    max_attempts: 3,
    target_score: 0.5,
  },
  meta_data: {
    operator_id: '',
    org_id: 1,
    org_slug: '',
    client_id: '',
  },
  updateVerifyInfo: (newInfo: VerifyInfo) => set(newInfo),
}));
