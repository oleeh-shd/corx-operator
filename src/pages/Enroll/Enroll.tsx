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
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';

export const Enroll: FC = () => {
  const navigate = useNavigate();

  const callStatus = useCallInfoStore((state) => state.call_status);
  const taskStatus = useEnrollInfoStore((state) => state.task_status);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);
  const updateEnrollInfo = useEnrollInfoStore((state) => state.updateEnrollInfo);
  const updateVadInfo = useVadInfoStore((state) => state.updateVadInfo);

  useEffect(() => {
    socket.on('event', (msg) => {
      handleEventMessage(msg, { updateCallInfo, updateEnrollInfo, updateVadInfo });
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

  const enrollResult =
    taskStatus === TaskStatuses.ERROR
      ? ActionStatuses.ENROLL_NOT_PASSED
      : ActionStatuses.ENROLL_PASSED;

  return (
    <>
      <CallerInfo animated isFinished={taskStatus === TaskStatuses.FINISHED} />
      {taskStatus === TaskStatuses.FINISHED || taskStatus === TaskStatuses.ERROR ? (
        <CallIdentify result={enrollResult} />
      ) : (
        <Progressbar screenType={TaskType.ENROLL} />
      )}
    </>
  );
};
