import { io } from 'socket.io-client';

export const socket = io('ws://localhost:8088/', {
  auth: {
    token: 'asdfasdfasdfasd',
  },
});

socket.on('disconnect', () => {
  window.location.replace('/');
})
