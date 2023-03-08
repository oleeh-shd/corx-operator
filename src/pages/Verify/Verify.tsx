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
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';
import OperationResultScreen from '../Home/components/OperationResultScreen/OperationResultScreen';
import { emitCommand, EmitCommandParams } from '../../utils/helpers/emitCommand';

export const Verify: FC = () => {
  const navigate = useNavigate();

  const callId = useCallInfoStore((state) => state.call_id);
  const clientId = useCallInfoStore((state) => state.call_data.client.client_id);
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
  const isActiveAgeGender = useOperationInfoStore((state) => state.isActiveAgeGender);
  const isActiveGenFace = useOperationInfoStore((state) => state.isActiveGenFace);

  const isSpoof = useAntiSpoofInfoStore((state) => state.task_data.is_spoof);
  const spoofTaskStatus = useAntiSpoofInfoStore((state) => state.task_status);

  const refreshVadTotalSeconds = useVadInfoStore((state) => state.refreshVadTotalSeconds);

  useEffect(() => {
    socket.on('event', (msg) => {
      handleEventMessage(msg, {
        updateCallInfo,
        updateVerifyInfo,
        updateVadInfo,
        updateAgeInfo,
        updateGenderInfo,
        updateVoiceToFaceInfo,
        updateAntiSpoofInfo,
      });
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
    const verifyResult = isSuccess ? ActionStatuses.VERIFIED : ActionStatuses.NOT_VERIFIED;

    const spoofResult =
      spoofTaskStatus === TaskStatuses.FINISHED
        ? isSpoof
          ? ActionStatuses.FRAUD_DETECTED
          : ActionStatuses.VERIFIED
        : ActionStatuses.NOT_VERIFIED;

    return !isActiveAntiSpoof ? verifyResult : spoofResult;
  };

  const status = () => {
    if (isActiveAntiSpoof) {
      return spoofTaskStatus === TaskStatuses.FINISHED;
    } else {
      return taskStatus === TaskStatuses.FINISHED;
    }
  };

  const restartVerification = () => {
    const params: EmitCommandParams = {
      socket,
      task_type: TaskType.VERIFY,
      call_id: callId,
      client_id: clientId,
    };

    refreshVadTotalSeconds();
    emitCommand(params);

    isActiveAntiSpoof && emitCommand({ socket, task_type: TaskType.ANTI_SPOOF, call_id: callId });
    isActiveAgeGender && emitCommand({ socket, task_type: TaskType.AGE, call_id: callId });
    isActiveAgeGender && emitCommand({ socket, task_type: TaskType.GENDER, call_id: callId });
    isActiveGenFace && emitCommand({ socket, task_type: TaskType.VOICE_TO_FACE, call_id: callId });
  };

  return (
    <>
      <CallerInfo animated isFinished={status()} />
      {status() ? (
        <>
          <CallIdentify result={checkResult()} />
          <OperationResultScreen result={checkResult()} onRestart={restartVerification} />
        </>
      ) : (
        <Progressbar screenType={TaskType.VERIFY} />
      )}
    </>
  );
};
