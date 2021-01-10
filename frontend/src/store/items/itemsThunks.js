import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from 'store/utils';

const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback);

export const createUserItem = ct('createUserItem', async (payload) => {
  const { name, totalMinutes, priority } = payload;
  const { item } = await post('/user-item', { name, totalMinutes, priority });
  return { item };
});

export const getUser = ct('getUser', async (payload) => {
  const { userId } = payload;
  const { user } = (await get(`/user?userId=${userId}`)) || {};
  return { items: user.items };
});

export const updateItem = ct('updateItems', async (payload) => {
  const { id, name, totalMinutes, priority } = payload;
  const { item } = await put(`/item?id=${id}`, { name, totalMinutes, priority });
  return { item };
});

export const deleteItem = ct('deleteItem', async (payload) => {
  const { id } = payload;
  await del(`/item?id=${id}`);
  return { id };
});

export const getGroups = ct('getGroups', async () => {
  const { groups } = await get('/group');
  return { groups };
});

export const saveList = ct('saveList', async (payload, thunkAPI) => {
  const { selected, selectedDate, selectedTime } = thunkAPI.getState();
  const resp = await post('/save-list', { selected, selectedDate, selectedTime });
  console.log('RESPONSE FROM GOOGLE', resp);
});
