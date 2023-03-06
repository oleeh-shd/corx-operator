import { create } from 'zustand';
import { TaskStatuses } from '../utils/enum/taskStatuses';
import { TaskType } from '../utils/enum/taskType';

interface TaskData {
  image_url: string;
}

export interface VoiceToFaceInfo {
  audio_id: string;
  task_id: string;
  task_type: TaskType;
  task_status: TaskStatuses | '';
  task_data: TaskData;
}

interface VoiceToFaceInfoStore extends VoiceToFaceInfo {
  updateVoiceToFaceInfo: (newInfo: VoiceToFaceInfo) => void;
}

export const useVoiceToFaceInfoStore = create<VoiceToFaceInfoStore>((set) => ({
  audio_id: '',
  task_id: '',
  task_type: TaskType.VERIFY,
  task_status: '',
  task_data: {
    image_url: '',
  },
  updateVoiceToFaceInfo: (newInfo: VoiceToFaceInfo) => set(newInfo),
}));
