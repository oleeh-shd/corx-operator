import React, { useEffect } from 'react';
import { MainScreen } from './components/MainScreen/MainScreen';
import { useCallInfoStore } from '../../stores/useCallInfo';
import { useConnection } from '../../stores/useConnection';
import { useVerifyInfoStore } from '../../stores/useVerifyInfo';
import { useEnrollInfoStore } from '../../stores/useEnrollInfo';
import { Socket } from 'socket.io-client';
import { TaskType } from '../../stores/sharedTypes';

const emitCommand = (
  socket: Socket,
  task_action: 'start' | 'finish',
  task_type: TaskType,
  client_id: string,
  call_id: string
): void => {
  socket.emit(
    'command',
    JSON.stringify({
      task_action,
      task_type,
      params: {
        client_id,
      },
      call_id,
    })
  );
};

export const Home = () => {
  const { socket } = useConnection();
  const { updateCallInfo, ...callInfo } = useCallInfoStore();
  const { updateVerifyInfo, ...verifyInfo } = useVerifyInfoStore();
  const { updateEnrollInfo, ...enrollInfo } = useEnrollInfoStore();

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
  }, []);

  return (
    <>
      <MainScreen />
      <div>Call status: {callInfo.call_status}</div>
      <div>Verify status: {verifyInfo.task_status}</div>
      <button
        onClick={() =>
          emitCommand(
            socket,
            'start',
            'verify',
            '1aca23c8-2c26-4ad5-a77c-224a3e1cafbd',
            '9f1feee5-bbd8-4f92-9e45-32f82680d15d'
          )
        }
      >
        start verify
      </button>
      <div>Enroll status: {enrollInfo.task_status}</div>
      <button
        onClick={() =>
          emitCommand(
            socket,
            'start',
            'enroll',
            '1aca23c8-2c26-4ad5-a77c-224a3e1cafbd',
            '9f1feee5-bbd8-4f92-9e45-32f82680d15d'
          )
        }
      >
        start enroll
      </button>
    </>
  );
};
