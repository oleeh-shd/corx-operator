import { AgeInfo } from '../../stores/useAgeInfo';
import { AntiSpoofInfo } from '../../stores/useAntiSpoofInfo';
import { CallInfo } from '../../stores/useCallInfo';
import { EnrollInfo } from '../../stores/useEnrollInfo';
import { GenderInfo } from '../../stores/useGenderInfo';
import { VadInfo } from '../../stores/useVadllInfo';
import { VerifyInfo } from '../../stores/useVerifyInfo';
import { VoiceToFaceInfo } from '../../stores/useVoiceToFaceInfo';
import { TaskType } from '../enum/taskType';

type StoreHandlers = {
  updateCallInfo: (newInfo: CallInfo) => void;
  updateVerifyInfo?: (newInfo: VerifyInfo) => void;
  updateVadInfo?: (newInfo: VadInfo) => void;
  updateEnrollInfo?: (newInfo: EnrollInfo) => void;
  updateAgeInfo?: (newInfo: AgeInfo) => void;
  updateGenderInfo?: (newInfo: GenderInfo) => void;
  updateVoiceToFaceInfo?: (newInfo: VoiceToFaceInfo) => void;
  updateAntiSpoofInfo?: (newInfo: AntiSpoofInfo) => void;
};

export const handleEventMessage = (
  msg: string,
  {
    updateCallInfo,
    updateEnrollInfo,
    updateVerifyInfo,
    updateVadInfo,
    updateAntiSpoofInfo,
    updateGenderInfo,
    updateVoiceToFaceInfo,
    updateAgeInfo
  }: StoreHandlers
): void => {
  const message = JSON.parse(msg);
  console.log(message);

  const isCall = Object.prototype.hasOwnProperty.call(message, 'call_id');
  const isVad = message?.task_type === TaskType.VAD;
  const isEnroll = message?.task_type === TaskType.ENROLL;
  const isVerify = message?.task_type === TaskType.VERIFY;

  const isAge = message?.task_type === TaskType.AGE;
  const isFender = message?.task_type === TaskType.GENDER;
  const isVoice2Face = message?.task_type === TaskType.VOICE_TO_FACE;
  const isAntiSpoof = message?.task_type === TaskType.ANTI_SPOOF;

  if (isCall) {
    updateCallInfo(message);
  }

  if (isEnroll && updateEnrollInfo) {
    updateEnrollInfo(message);
  }

  if (isVerify && updateVerifyInfo) {
    updateVerifyInfo(message);
  }

  if (isVad && updateVadInfo) {
    updateVadInfo(message);
  }

  if (isAge && updateAgeInfo) {
    updateAgeInfo(message);
  }

  if (isFender && updateGenderInfo) {
    updateGenderInfo(message);
  }

  if (isVoice2Face && updateVoiceToFaceInfo) {
    updateVoiceToFaceInfo(message);
  }

  if (isAntiSpoof && updateAntiSpoofInfo) {
    updateAntiSpoofInfo(message);
  }
};
