import { api } from './api';

export const getContacts = async () => {
  try {
    const contacts = await api.get('/contact');

    return contacts.data;
  } catch (e) {

    return false;
  }
}

export const createContact = async (data) => {
  try {
    await api.post('/contact', data, {
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

export const updateContact = async (data) => {
  try {
    await api.put('/contact', data, {
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

export const deleteContact = async (id) => {
  try {
    await api.delete(`/contact/${id}`, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    })
    
    return true;
  } catch (e) {

    return false;
  }
}