import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useEnrollInfoStore } from '../../stores/useEnrollInfo';
import { useVadInfoStore } from '../../stores/useVadllInfo';
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

const TIMEOUT_FOR_ENROLL = 20000;

export const Enroll: FC = () => {
  const navigate = useNavigate();

  const callStatus = useCallInfoStore((state) => state.call_status);
  const taskStatus = useEnrollInfoStore((state) => state.task_status);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);
  const updateEnrollInfo = useEnrollInfoStore((state) => state.updateEnrollInfo);
  const updateVadInfo = useVadInfoStore((state) => state.updateVadInfo);

  const isTimeExceeded = useTimeout(TIMEOUT_FOR_ENROLL);

  useEffect(() => {
    socket.on('event', (msg) => {
      if (!isTimeExceeded) {
        handleEventMessage(msg, { updateCallInfo, updateEnrollInfo, updateVadInfo });
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

  const enrollResult = isTimeExceeded
    ? ActionStatuses.TIMEOUT_EXCEEDED
    : ActionStatuses.ENROLL_PASSED;

  return (
    <>
      <CallerInfo animated isFinished={taskStatus === TaskStatuses.FINISHED} />
      {taskStatus === TaskStatuses.FINISHED || isTimeExceeded ? (
        <CallIdentify result={enrollResult} />
      ) : (
        <Progressbar screenType={TaskType.ENROLL} />
      )}
    </>
  );
};
