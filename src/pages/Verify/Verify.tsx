import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useVadInfoStore } from '../../stores/useVadllInfo';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { CallStatuses } from '../../utils/enum/callStatuses';
import { TaskStatuses } from '../../utils/enum/taskStatuses';
import { TaskType } from '../../utils/enum/taskType';
import { socket } from '../../utils/helpers/connection';
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';

export const Verify = () => {
  const navigate = useNavigate();
  const callStatus = useCallInfoStore((state) => state.call_status);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);

  const taskStatus = useVerifyInfoStore((state) => state.task_status);
  const isSuccess = useVerifyInfoStore((state) => state.task_data.is_success);
  const updateVerifyInfo = useVerifyInfoStore((state) => state.updateVerifyInfo);
  const updateVadInfo = useVadInfoStore((state) => state.updateVadInfo);

  useEffect(() => {
    callStatus === CallStatuses.WAITING && navigate('/')
  }, [callStatus])

  useEffect(() => {
    socket.on('event', (msg) => {
      const message = JSON.parse(msg);

      const isCall = Object.prototype.hasOwnProperty.call(message, 'call_id');
      const isTask = Object.prototype.hasOwnProperty.call(message, 'task_id');
      const isVad = (message?.task_type === 'vad');

      if (isCall) {
        updateCallInfo(message);
      }

      if (isTask) {
        updateVerifyInfo(message);
      }

      if (isVad) {
        updateVadInfo(message);
      }
    });

    if (callStatus === CallStatuses.FINISHED && taskStatus !== TaskStatuses.FINISHED) {
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
