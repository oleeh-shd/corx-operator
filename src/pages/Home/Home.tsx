import React, { useEffect } from 'react';
import { MainScreen } from './components/MainScreen/MainScreen';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { socket } from '../../utils/helpers/connection';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { useEnrollInfoStore } from '../../stores/useEnrollInfo';
import { OngoingScreen } from './components/OngoingScreen/OngoingScreen';
import { OperationScreen } from './components/OperationScreen/OperationScreen';
import { Navigate } from 'react-router-dom';

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

  return callInfo.call_status === 'started' ? (
    <>
      {!isAuth && <Navigate to={'/login'} replace={true}/>}
      <OngoingScreen callerPhoneNumber={callInfo.call_data.from} />
      <OperationScreen />
    </>
  ) : (
    <MainScreen />
  );
};
