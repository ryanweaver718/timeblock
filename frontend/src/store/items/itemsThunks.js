import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, del } from 'store/utils';

const ct = (action, callback) => createAsyncThunk(`items/thunk/${action}`, callback);

export const createUserItem = ct('createUserItem', async (payload) => {
  const { name, totalMinutes, priority, userId = 'test123' } = payload;
  const { item } = await post(`/user-item?userId=${userId}`, { name, totalMinutes, priority });
  return { item };
});

export const getUser = ct('getUser', async (payload) => {
  const { userId } = payload;
  const { user } = (await get(`/user?userId=${userId}`)) || {};
  return { items: user.items };
});

export const updateUserItem = ct('updateUserItem', async (payload) => {
  const { fieldName, fieldValue, userId = 'test123', id } = payload;
  const { item } = await put(`/item?id=${id}&userId=${userId}`, { fieldName, fieldValue });
  return { item };
});

export const deleteUserItem = ct('deleteUserItem', async (payload) => {
  const { id, userId = 'test123' } = payload;
  await del(`/item?id=${id}&userId=${userId}`);
  return { id };
});

export const createDay = ct('createDay', async (payload) => {
  const { date, userId = 'test123', items = [], startTime } = payload;
  const { day } = await post(`/day?userId=${userId}`, { date, startTime, items });
  return { day };
});

export const updateDay = ct('updateDay', async (payload) => {
  const { userId = 'test123', fieldName, fieldValue, date } = payload;
  const { day } = await put(`/day?userId=${userId}`, { date, fieldName, fieldValue });
  return { day };
});

export const updateDayItem = ct('updateDayItem', async (payload) => {
  const { userId = 'test123', date, dynamoIndex, fieldName, fieldValue } = payload;
  const { items } = await put(`/day?userId=${userId}`, { date, dynamoIndex, fieldName, fieldValue });
  return { items };
});

export const deleteDay = ct('deleteDay', async (payload) => {
  const { userId = 'test123', date } = payload;
  await del(`/day?date=${date}&userId=${userId}`);
  return { date };
});

export const saveList = ct('saveList', async (payload, thunkAPI) => {
  const { selected, selectedDate, selectedTime } = thunkAPI.getState();
  const resp = await post('/save-list', { selected, selectedDate, selectedTime });
  console.log('RESPONSE FROM GOOGLE', resp);
});
