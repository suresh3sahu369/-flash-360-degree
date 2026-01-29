import api from './api';
import Cookies from 'js-cookie';

export const login = async (email, password) => {
  const { data } = await api.post('/login', { email, password });
  Cookies.set('token', data.token, { expires: 7 });
  Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post('/register', userData);
  Cookies.set('token', data.token, { expires: 7 });
  Cookies.set('user', JSON.stringify(data.user), { expires: 7 });
  return data;
};

export const logout = async () => {
  await api.post('/logout');
  Cookies.remove}