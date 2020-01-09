import { socket } from 'services/socket.service';

import * as api from './user.api';
import * as storage from './user.storage';

const setUser = (user) => (dispatch) => {
  dispatch({ type: 'user:set', payload: { user } });
  storage.setUser(user);
};

export const signIn = ({
  email,
  password,
}) => async (dispatch) => {
  const { data: user } = await api.signIn({
    email,
    password,
  });
  dispatch(setUser(user));
  socket.connect();
};

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}) => async (dispatch) => {
  const { data: user } = await api.signIn({
    firstName,
    lastName,
    email,
    password,
  });
  dispatch(setUser(user));
  socket.connect();
};

export const forgot = ({ email }) => async () => {
  await api.forgot({ email });
};

export const reset = ({ password, token }) => async (dispatch) => {
  const { data: user } = await api.reset({ password, token });
  dispatch(setUser(user));
  socket.connect();
};

export const signOut = () => (dispatch) => {
  dispatch({ type: 'user:delete' });
  storage.deleteUser();
  socket.disconnect();
};

export const updateCurrentUser = (data) => async (dispatch) => {
  const { data: user } = await api.update(data);
  dispatch(setUser(user));
};
