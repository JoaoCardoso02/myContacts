import { api } from './api';
import { setLogin } from '../utils/auth';

export const createUser = async (data) => {
  try {
    await api.post('/user', data, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return true;

  } catch (e) {
    return false;
  }
}

export const login = async (data) => {

  try {
    const dataAPI = await api.post('/user/login', data, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    setLogin(dataAPI.data.token, dataAPI.data.user.id);


    return true;
  } catch (e) {

    return false;
  }
}

export const getUser = async () => {
  try {
    const dataAPI = await api.get('/user/profile');
    
    return dataAPI.data;
  } catch (e) {

    return false;
  }
}

export const alterDataUser = async (data) => {
  try {
    await api.put('/user', data, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
    
    return true;
  } catch (e) {
    if (e.response) {
      return e.response.data;
    }

    return false;
  }
}

export const alterPassword = async (data) => {
  try {
    await api.put('/user/password', data, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
    
    return true;
  } catch (e) {

    return false;
  }
}

export const deleteUser = async () => {
  try {
    await api.delete('/user', {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
    
    return true;
  } catch (e) {

    return false;
  }
}