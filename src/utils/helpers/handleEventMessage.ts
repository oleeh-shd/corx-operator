import { CallInfo } from '../../stores/useCallInfo';
import { EnrollInfo } from '../../stores/useEnrollInfo';
import { VadInfo } from '../../stores/useVadllInfo';
import { VerifyInfo } from '../../stores/useVerifyInfo';
import { TaskType } from '../enum/taskType';

type StoreHandlers = {
  updateCallInfo: (newInfo: CallInfo) => void;
  updateVerifyInfo?: (newInfo: VerifyInfo) => void;
  updateVadInfo?: (newInfo: VadInfo) => void;
  updateEnrollInfo?: (newInfo: EnrollInfo) => void;
};

export const handleEventMessage = (
  msg: string,
  { updateCallInfo, updateEnrollInfo, updateVerifyInfo, updateVadInfo }: StoreHandlers
): void => {
  const message = JSON.parse(msg);
  console.log(message);

  const isCall = Object.prototype.hasOwnProperty.call(message, 'call_id');
  const isVad = message?.task_type === TaskType.VAD;
  const isEnroll = message?.task_type === TaskType.ENROLL;
  const isVerify = message?.task_type === TaskType.VERIFY;

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
};
