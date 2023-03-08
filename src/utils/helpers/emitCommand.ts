import { Socket } from 'socket.io-client';
import { TaskType } from '../enum/taskType';

export type EmitCommandParams = {
  socket: Socket;
  task_type: TaskType;
  call_id: string;
  client_id?: string;
};

export const emitCommand = ({ socket, task_type, call_id, client_id }: EmitCommandParams): void => {
  socket.emit(
    'command',
    JSON.stringify({
      task_action: 'start',
      task_type,
      params: {
        client_id,
      },
      call_id,
    })
  );
};
