import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgeInfoStore } from '../../stores/useAgeInfo';
import { useAntiSpoofInfoStore } from '../../stores/useAntiSpoofInfo';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useGenderInfoStore } from '../../stores/useGenderInfo';
import { useOperationInfoStore } from '../../stores/useOperationInfo';
import { useVadInfoStore } from '../../stores/useVadllInfo';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { ActionStatuses } from '../../utils/enum/actionStatuses';
import { useVoiceToFaceInfoStore } from '../../stores/useVoiceToFaceInfo';
import { CallStatus } from '../../utils/enum/callStatuses';
import { TaskStatuses } from '../../utils/enum/taskStatuses';
import { TaskType } from '../../utils/enum/taskType';
import { socket } from '../../utils/helpers/connection';
import { handleEventMessage } from '../../utils/helpers/handleEventMessage';
import { useTimeout } from '../../utils/hooks/useTimeout';
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';
import OperationResultScreen from '../Home/components/OperationResultScreen/OperationResultScreen';

const TIMEOUT_FOR_VERIFY = 20000;

export const Verify: FC = () => {
  const navigate = useNavigate();

  const callStatus = useCallInfoStore((state) => state.call_status);
  const taskStatus = useVerifyInfoStore((state) => state.task_status);
  const isSuccess = useVerifyInfoStore((state) => state.task_data.is_success);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);
  const updateVerifyInfo = useVerifyInfoStore((state) => state.updateVerifyInfo);
  const updateVadInfo = useVadInfoStore((state) => state.updateVadInfo);

  const updateAgeInfo = useAgeInfoStore((state) => state.updateAgeInfo);
  const updateGenderInfo = useGenderInfoStore((state) => state.updateGenderInfo);
  const updateVoiceToFaceInfo = useVoiceToFaceInfoStore((state) => state.updateVoiceToFaceInfo);
  const updateAntiSpoofInfo = useAntiSpoofInfoStore((state) => state.updateAntiSpoofInfo);
  const isActiveAntiSpoof = useOperationInfoStore((state) => state.isActiveAntiSpoof);

  const isSpoof = useAntiSpoofInfoStore((state) => state.task_data.is_spoof);
  const spoofTaskStatus = useAntiSpoofInfoStore((state) => state.task_status);

  const isTimeExceeded = useTimeout(TIMEOUT_FOR_VERIFY);

  useEffect(() => {
    socket.on('event', (msg) => {
      if (!isTimeExceeded) {
        handleEventMessage(msg, {
          updateCallInfo,
          updateVerifyInfo,
          updateVadInfo,
          updateAgeInfo,
          updateGenderInfo,
          updateVoiceToFaceInfo,
          updateAntiSpoofInfo,
        });
      }
    });

    if (
      (callStatus === CallStatus.FINISHED && taskStatus !== TaskStatuses.FINISHED) ||
      callStatus === ''
    ) {
      navigate('/');
    }

    return () => {
      socket.off('event');
    };
  }, [callStatus, taskStatus]);

  const checkResult = () => {
    const verifyResult = isSuccess
      ? ActionStatuses.VERIFIED
      : isTimeExceeded
      ? ActionStatuses.TIMEOUT_EXCEEDED
      : ActionStatuses.NOT_VERIFIED;

    const spoofResult =
      spoofTaskStatus === TaskStatuses.FINISHED
        ? isSpoof
          ? ActionStatuses.FRAUD_DETECTED
          : ActionStatuses.VERIFIED
        : isTimeExceeded
        ? ActionStatuses.TIMEOUT_EXCEEDED
        : ActionStatuses.NOT_VERIFIED;

    return !isActiveAntiSpoof ? verifyResult : spoofResult;
  };

  const status = () => {
    if (isActiveAntiSpoof) {
      return spoofTaskStatus === TaskStatuses.FINISHED || isTimeExceeded;
    } else {
      return taskStatus === TaskStatuses.FINISHED || isTimeExceeded;
    }
  };
  return (
    <>
      <CallerInfo animated isFinished={status()} />
      {status() ? (
        <>
          <CallIdentify result={checkResult()} />
          <OperationResultScreen result={checkResult()} onRestart={() => console.log('')} />
        </>
      ) : (
        <Progressbar screenType={TaskType.VERIFY} />
      )}
    </>
  );
};
