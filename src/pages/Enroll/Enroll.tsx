import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { socket } from '../../utils/helpers/connection';
import { useEnrollInfoStore } from '../../stores/useEnrollInfo';
import CallerInfo from '../Home/components/CallerInfo/CallerInfo';
import CallIdentify from '../Home/components/CallIdentify/CallIdentify';
import Progressbar from '../Home/components/Progressbar/Progressbar';

export const Enroll = () => {
  const navigate = useNavigate();
  const callStatus = useCallInfoStore((state) => state.call_status);
   const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);

  const taskStatus = useEnrollInfoStore((state) => state.task_status);
  const isSuccess = useEnrollInfoStore((state) => state.task_data.is_success);
  const updateEnrollInfo = useEnrollInfoStore((state) => state.updateEnrollInfo);

  useEffect(() => {
    callStatus === 'waiting' && navigate('/')
  }, [callStatus])

  useEffect(() => {
    socket.on('event', (msg) => {
      const message = JSON.parse(msg);

      const isCall = Object.prototype.hasOwnProperty.call(message, 'call_id');
      const isTask = Object.prototype.hasOwnProperty.call(message, 'task_id');

      if (isCall) {
        updateCallInfo(message);
      }

      if (isTask) {
        updateEnrollInfo(message);
      }
    });

    if (callStatus === 'finished' && taskStatus !== 'finished') {
      navigate('/');
    }

    return () => {
      socket.off('event');
    };
  }, [callStatus, taskStatus]);

  return (
    <>
      <CallerInfo animated />
      {taskStatus === 'finished' ? (
        <CallIdentify result={isSuccess ? 'enroll-passed' : 'enroll-not-passed'} />
      ) : (
        <Progressbar
          timeInSeconds={123}
          counterTimeEnded={() => console.log(123)}
          vadSeconds={10}
          onUpdate={() => console.log()}
          screenType="enroll"
        />
      )}
    </>
  );
};
