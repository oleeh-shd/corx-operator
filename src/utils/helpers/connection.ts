import { io } from 'socket.io-client';

const BACKEND_URL = 'wss://api.corx.corsound.ai';

export const socket = io(BACKEND_URL || 'ws://localhost:8088/', {
  auth: {
    token: 'asdfasdfasdfasd',
  },
});

socket.on('disconnect', () => {
  console.log('disconnect');

  window.location.replace('/');
});
