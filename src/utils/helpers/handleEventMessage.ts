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
  const isTask = Object.prototype.hasOwnProperty.call(message, 'task_id');
  const isVad = message?.task_type === TaskType.VAD;

  if (isCall) {
    updateCallInfo(message);
  }

  if (isTask && updateEnrollInfo) {
    updateEnrollInfo(message);
  }

  if (isTask && updateVerifyInfo) {
    updateVerifyInfo(message);
  }

  if (isVad && updateVadInfo) {
    updateVadInfo(message);
  }
};
