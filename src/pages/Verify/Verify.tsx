import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useVadInfoStore } from '../../stores/useVadllInfo';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { CallStatus } from '../../utils/enum/callStatuses';
import { TaskStatuses } from '../../utils/enum/taskStatuses';
import { TaskType } from '../../utils/enum/taskType';
import { socket } from '../../utils/helpers/connection';
import { handleEventMessage } from '../../utils/helpers/handleEventMessage';
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';

export const Verify: FC = () => {
  const navigate = useNavigate();

  const callStatus = useCallInfoStore((state) => state.call_status);
  const taskStatus = useVerifyInfoStore((state) => state.task_status);
  const isSuccess = useVerifyInfoStore((state) => state.task_data.is_success);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);
  const updateVerifyInfo = useVerifyInfoStore((state) => state.updateVerifyInfo);
  const updateVadInfo = useVadInfoStore((state) => state.updateVadInfo);

  useEffect(() => {
    socket.on('event', (msg) => {
      handleEventMessage(msg, { updateCallInfo, updateVerifyInfo, updateVadInfo });
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

  return (
    <>
      <CallerInfo animated isFinished={taskStatus === TaskStatuses.FINISHED} />
      {taskStatus === TaskStatuses.FINISHED ? (
        <CallIdentify result={isSuccess ? 'voice-verified' : 'voice-not-verified'} />
      ) : (
        <Progressbar screenType={TaskType.VERIFY} />
      )}
    </>
  );
};
