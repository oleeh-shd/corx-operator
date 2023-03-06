import { create } from 'zustand';

export interface OperationInfo {
  isActiveGenFace: boolean;
  isActiveAgeGender: boolean;
  isActiveAntiSpoof: boolean;
}

interface OperationInfoStore extends OperationInfo {
  updateOperationInfo: (newInfo: Partial<OperationInfo>) => void;
}

export const useOperationInfoStore = create<OperationInfoStore>((set) => ({
  isActiveGenFace: false,
  isActiveAgeGender: false,
  isActiveAntiSpoof: false,
  updateOperationInfo: (newInfo: Partial<OperationInfo>) => {
    return set((prev) => ({...prev, ...newInfo}))
  },
}));
