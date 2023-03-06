import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useVadInfoStore } from '../../stores/useVadllInfo';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { ActionStatuses } from '../../utils/enum/actionStatuses';
import { CallStatus } from '../../utils/enum/callStatuses';
import { TaskStatuses } from '../../utils/enum/taskStatuses';
import { TaskType } from '../../utils/enum/taskType';
import { socket } from '../../utils/helpers/connection';
import { handleEventMessage } from '../../utils/helpers/handleEventMessage';
import { useTimeout } from '../../utils/hooks/useTimeout';
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';

const TIMEOUT_FOR_VERIFY = 20000;

export const Verify: FC = () => {
  const navigate = useNavigate();

  const callStatus = useCallInfoStore((state) => state.call_status);
  const taskStatus = useVerifyInfoStore((state) => state.task_status);
  const isSuccess = useVerifyInfoStore((state) => state.task_data.is_success);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);
  const updateVerifyInfo = useVerifyInfoStore((state) => state.updateVerifyInfo);
  const updateVadInfo = useVadInfoStore((state) => state.updateVadInfo);

  const isTimeExceeded = useTimeout(TIMEOUT_FOR_VERIFY);

  useEffect(() => {
    socket.on('event', (msg) => {
      if (!isTimeExceeded) {
        handleEventMessage(msg, { updateCallInfo, updateVerifyInfo, updateVadInfo });
      }
    });

    if (
      (callStatus === CallStatus.FINISHED && taskStatus !== TaskStatuses.FINISHED) ||
      callStatus === CallStatus.WAITING
    ) {
      navigate('/');
    }

    return () => {
      socket.off('event');
    };
  }, [callStatus, taskStatus]);

  const verifyResult = isSuccess
    ? ActionStatuses.VERIFIED
    : isTimeExceeded
    ? ActionStatuses.TIMEOUT_EXCEEDED
    : ActionStatuses.NOT_VERIFIED;

  return (
    <>
      <CallerInfo animated isFinished={taskStatus === TaskStatuses.FINISHED} />
      {taskStatus === TaskStatuses.FINISHED || isTimeExceeded ? (
        <CallIdentify result={verifyResult} />
      ) : (
        <Progressbar screenType={TaskType.VERIFY} />
      )}
    </>
  );
};
