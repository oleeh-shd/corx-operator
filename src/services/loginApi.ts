import { LoginData } from '../stores/sharedTypes';
import fetch from './api';
import { LOGIN_ENDPOINT } from './constants';

const login = async (username: string, password: string): Promise<LoginData> => {
  return await fetch.api.post(LOGIN_ENDPOINT, {
    username,
    password,
  });
};

export default {
  login,
};
