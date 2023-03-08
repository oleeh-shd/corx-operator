import { io } from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'ws://localhost:8088/';

export const socket = io(BACKEND_URL, {
  auth: {
    token: 'asdfasdfasdfasd',
  },
});

socket.on('disconnect', () => {
  console.log('disconnect');

  window.location.replace('/');
});
