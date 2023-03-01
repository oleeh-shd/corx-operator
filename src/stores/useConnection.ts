import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface ConnectionStore {
  socket: Socket;
}

const token =
  localStorage.getItem('token') || sessionStorage.getItem('token');

const socket = io('ws://localhost:8088/', {
  auth: {
    token: token || 'asdfasdfasdfasd',
  },
});

export const useConnection = create<ConnectionStore>(() => ({
  socket,
}));
