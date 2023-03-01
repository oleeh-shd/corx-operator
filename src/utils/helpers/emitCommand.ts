import { Socket } from 'socket.io-client';
import { TaskType } from '../../stores/sharedTypes';

export const emitCommand = (
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
