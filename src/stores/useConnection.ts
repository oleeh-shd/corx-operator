import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface ConnectionStore {
  socket: Socket;
}

const socket = io('ws://localhost:8088/', {
  auth: {
    token: 'asdfasdfasdfasd',
  },
});

export const useConnection = create<ConnectionStore>(() => ({
  socket,
}));
