import { Socket } from 'socket.io-client';
import { TaskType } from '../enum/taskType';

export const emitCommand = (
  socket: Socket,
  task_action: 'start' | 'finish',
  task_type: TaskType,
  call_id: string,
  client_id?: string
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
