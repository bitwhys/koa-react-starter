import io from 'socket.io-client';

import config from 'config';
import { getAccessToken } from 'helpers/token.helper';
import * as userHandlers from 'resources/user/user.handlers';


let socket; // eslint-disable-line import/no-mutable-exports

export const connect = () => {
  socket = io(config.webSocketUrl, {
    transports: ['websocket'],
    query: { accessToken: getAccessToken() },
  });

  socket.on('connect', () => {
    console.log('WS connected'); // eslint-disable-line no-console
    userHandlers.attachSocketEvents(socket);
  });

  socket.on('disconnect', () => {
    console.log('WS disconnected'); // eslint-disable-line no-console
  });
};

export const disconnect = () => {
  if (!socket) return;
  socket.disconnect();
};

export const disconnected = () => {
  return !socket || socket.disconnected;
};

export {
  socket,
};
