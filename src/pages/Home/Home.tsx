import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useEnrollInfoStore } from '../../stores/useEnrollInfo';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { CallStatus } from '../../utils/enum/callStatuses';
 import { socket } from '../../utils/helpers/connection';
import { MainScreen } from './components/MainScreen/MainScreen';
import { OngoingScreen } from './components/OngoingScreen/OngoingScreen';
import { OperationScreen } from './components/OperationScreen/OperationScreen';

export const Home = () => {
  const { updateCallInfo, ...callInfo } = useCallInfoStore();
  const updateVerifyInfo = useVerifyInfoStore((state) => state.updateVerifyInfo);
  const updateEnrollInfo = useEnrollInfoStore((state) => state.updateEnrollInfo);

  const isAuth =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('event', (msg) => {
      const message = JSON.parse(msg);

      const isCall = Object.prototype.hasOwnProperty.call(message, 'call_id');
      const isTask = Object.prototype.hasOwnProperty.call(message, 'task_id');

      if (isCall) {
        updateCallInfo(message);
      }

      if (isTask) {
        if (message.task_type === 'verify') updateVerifyInfo(message);

        if (message.task_type === 'enroll') updateEnrollInfo(message);
      }
    });

    return () => {
      socket.off('event');
    };
  }, []);

  return callInfo.call_status === CallStatus.STARTED ? (
    <>
      {!isAuth && <Navigate to={'/login'} replace={true}/>}
      <OngoingScreen phoneNumber={callInfo.call_data.from} />
      <OperationScreen />
    </>
  ) : (
    <MainScreen />
  );
};
