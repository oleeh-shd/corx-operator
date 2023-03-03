import React, { useEffect, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { CallStatus } from '../../utils/enum/callStatuses';
import { socket } from '../../utils/helpers/connection';
import { handleEventMessage } from '../../utils/helpers/handleEventMessage';
import { MainScreen } from './components/MainScreen/MainScreen';
import { OngoingScreen } from './components/OngoingScreen/OngoingScreen';
import { OperationScreen } from './components/OperationScreen/OperationScreen';

export const Home: FC = () => {
  const callStatus = useCallInfoStore((state) => state.call_status);
  const callerPhoneNumber = useCallInfoStore((state) => state.call_data.from);
  const updateCallInfo = useCallInfoStore((state) => state.updateCallInfo);

  const isAuth = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('event', (msg) => {
      handleEventMessage(msg, { updateCallInfo });
    });

    return () => {
      socket.off('event');
    };
  }, []);

  return callStatus === CallStatus.STARTED ? (
    <>
      {!isAuth && <Navigate to={'/login'} replace={true} />}
      <OngoingScreen phoneNumber={callerPhoneNumber} />
      <OperationScreen />
    </>
  ) : (
    <MainScreen />
  );
};
